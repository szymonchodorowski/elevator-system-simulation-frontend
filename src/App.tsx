import { useEffect, useState } from 'react';
import { Container, Typography, Box, Chip, Snackbar, Alert } from '@mui/material';
import { elevatorService } from './services/elevatorService';
import { useElevatorSSE } from './hooks/useElevatorSSE';
import type { BuildingConfig } from './types/elevator';
import { Building } from './components/Building';
import { ElevatorPanel } from './components/ElevatorPanel';

function App() {
    const [config, setConfig] = useState<BuildingConfig | null>(null);
    const { elevators, connected } = useElevatorSSE();
    const [selectedElevator, setSelectedElevator] = useState<number | null>(null);
    const [activeHallCalls, setActiveHallCalls] = useState<Set<string>>(new Set());
    const [snackbar, setSnackbar] = useState<string | null>(null);

    useEffect(() => {
        elevatorService.getBuildingConfig().then(setConfig);
    }, []);

    const handleHallCall = async (floor: number, direction: 'UP' | 'DOWN') => {
        const key = `${floor}-${direction}`;
        if (activeHallCalls.has(key)) return;

        const elevatorId = await elevatorService.callElevator(floor, direction);
        setActiveHallCalls(prev => new Set(prev).add(key));
        setSnackbar(`Elevator ${elevatorId} called to floor ${floor}`);
    };

    const handleElevatorClick = (elevatorId: number) => {
        setSelectedElevator(elevatorId);
    };

    const handleSelectFloor = async (floor: number) => {
        if (selectedElevator === null) return;
        await elevatorService.selectFloor(selectedElevator, floor);
        setSnackbar(`Elevator ${selectedElevator} → floor ${floor}`);
        setSelectedElevator(null);
    };

    useEffect(() => {
        if (elevators.length === 0) return;
        setActiveHallCalls(prev => {
            const next = new Set(prev);
            for (const key of prev) {
                const [floor] = key.split('-');
                const floorNum = parseInt(floor);
                const elevatorOnFloor = elevators.some(
                    e => e.currentFloor === floorNum && e.doorStatus === 'OPEN'
                );
                if (elevatorOnFloor) {
                    next.delete(key);
                }
            }
            return next;
        });
    }, [elevators]);

    const selectedElevatorState = elevators.find(e => e.id === selectedElevator);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="h4">
                    Elevator System Simulation
                </Typography>
                <Chip
                    label={connected ? 'Live' : 'Disconnected'}
                    color={connected ? 'success' : 'error'}
                    size="small"
                />
            </Box>

            {config && (
                <Building
                    config={config}
                    elevators={elevators}
                    activeHallCalls={activeHallCalls}
                    onHallCall={handleHallCall}
                    onElevatorClick={handleElevatorClick}
                />
            )}

            {selectedElevatorState && config && (
                <ElevatorPanel
                    elevatorId={selectedElevatorState.id}
                    numberOfFloors={config.numberOfFloors}
                    currentFloor={selectedElevatorState.currentFloor}
                    targetFloors={selectedElevatorState.targetFloors}
                    onSelectFloor={handleSelectFloor}
                    onClose={() => setSelectedElevator(null)}
                />
            )}

            <Snackbar
                open={snackbar !== null}
                autoHideDuration={2000}
                onClose={() => setSnackbar(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setSnackbar(null)}>
                    {snackbar}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default App;