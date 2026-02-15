import { useState, useEffect, useRef } from 'react';
import type { ElevatorState } from '../types/elevator';
import { elevatorService } from '../services/elevatorService';

export function useElevatorSSE() {
    const [elevators, setElevators] = useState<ElevatorState[]>([]);
    const [connected, setConnected] = useState(false);
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        const eventSource = new EventSource('/api/v1/elevators/stream');
        eventSourceRef.current = eventSource;

        eventSource.addEventListener('elevator-update', (event) => {
            const data: ElevatorState[] = JSON.parse(event.data);
            setElevators(data);
            setConnected(true);
        });

        eventSource.onerror = () => {
            setConnected(false);
            eventSource.close();
            startPollingFallback();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const startPollingFallback = () => {
        const interval = setInterval(async () => {
            try {
                const data = await elevatorService.getAllElevators();
                setElevators(data);
                setConnected(true);
            } catch {
                setConnected(false);
            }
        }, 2000);

        return () => clearInterval(interval);
    };

    return { elevators, connected };
}