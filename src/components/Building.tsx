import { Box, Typography } from '@mui/material';
import { Floor } from './Floor';
import type { ElevatorState, BuildingConfig } from '../types/elevator';

interface BuildingProps {
    config: BuildingConfig;
    elevators: ElevatorState[];
    activeHallCalls: Set<string>;
    onHallCall: (floor: number, direction: 'UP' | 'DOWN') => void;
    onElevatorClick: (elevatorId: number) => void;
}

export function Building({ config, elevators, activeHallCalls, onHallCall, onElevatorClick }: BuildingProps) {
    const floors = Array.from({ length: config.numberOfFloors }, (_, i) => config.numberOfFloors - 1 - i);

    return (
        <Box>
            <Box sx={{ display: 'flex', pl: '100px', mb: 1 }}>
                {elevators.map((elevator) => (
                    <Typography
                        key={elevator.id}
                        variant="caption"
                        fontWeight="bold"
                        sx={{ flex: 1, textAlign: 'center', color: '#666' }}
                    >
                        Elevator {elevator.id}
                    </Typography>
                ))}
            </Box>
            <Box sx={{
                border: '2px solid #bdbdbd',
                borderRadius: 2,
                overflow: 'hidden',
            }}>
                {floors.map((floor) => (
                    <Floor
                        key={floor}
                        floor={floor}
                        elevators={elevators}
                        activeHallCalls={activeHallCalls}
                        isTop={floor === config.numberOfFloors - 1}
                        isBottom={floor === 0}
                        onHallCall={onHallCall}
                        onElevatorClick={onElevatorClick}
                    />
                ))}
            </Box>
        </Box>
    );
}