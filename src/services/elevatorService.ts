import axios from 'axios';
import type { BuildingConfig, ElevatorState } from '../types/elevator';

const api = axios.create({
    baseURL: '/api/v1',
});

export const elevatorService = {
    getBuildingConfig: async (): Promise<BuildingConfig> => {
        const { data } = await api.get<BuildingConfig>('/building');
        return data;
    },

    getAllElevators: async (): Promise<ElevatorState[]> => {
        const { data } = await api.get<ElevatorState[]>('/elevators');
        return data;
    },

    callElevator: async (floor: number, direction: 'UP' | 'DOWN'): Promise<number> => {
        const { data } = await api.post<number>('/elevators/call', { floor, direction });
        return data;
    },

    selectFloor: async (elevatorId: number, targetFloor: number): Promise<void> => {
        await api.post(`/elevators/${elevatorId}/floor`, { targetFloor });
    },
};