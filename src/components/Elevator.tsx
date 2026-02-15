import { Box, Tooltip } from '@mui/material';
import type { ElevatorState } from '../types/elevator';

interface ElevatorProps {
    elevator: ElevatorState;
    floor: number;
    onElevatorCall: (elevatorId: number) => void;
}

export function Elevator({ elevator, floor, onElevatorCall }: ElevatorProps) {
    const isHere = elevator.currentFloor === floor;
    const isTarget = elevator.targetFloors.includes(floor);

    const directionArrow = elevator.direction === 'UP' ? '▲' : elevator.direction === 'DOWN' ? '▼' : '';

    return (
        <Tooltip title={isHere ? `Click to open cab panel` : ''}>
            <Box
                onClick={() => isHere && onElevatorCall(elevator.id)}
                sx={{
                    flex: 1,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isTarget ? '#e3f2fd' : 'transparent',
                    cursor: isHere ? 'pointer' : 'default',
                    position: 'relative',
                }}
            >
                {isTarget && !isHere && (
                    <Box sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#1976d2',
                    }} />
                )}
                {isHere && (
                    <Box sx={{
                        width: 40,
                        height: 50,
                        backgroundColor: elevator.doorStatus === 'OPEN' ? '#4caf50' : '#1976d2',
                        borderRadius: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: 11,
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s',
                        boxShadow: 2,
                    }}>
                        <span>{directionArrow}</span>
                        <span>{elevator.id}</span>
                    </Box>
                )}
            </Box>
        </Tooltip>
    );
}