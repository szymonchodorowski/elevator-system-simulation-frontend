export interface ElevatorState {
    id: number;
    currentFloor: number;
    direction: 'UP' | 'DOWN' | 'IDLE';
    doorStatus: 'OPEN' | 'CLOSED';
    targetFloors: number[];
}

export interface BuildingConfig {
    numberOfFloors: number;
    numberOfElevators: number;
}