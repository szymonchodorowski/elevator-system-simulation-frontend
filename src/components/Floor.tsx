import { Box, Typography, IconButton } from '@mui/material';
import type { ElevatorState } from '../types/elevator';
import { Elevator } from './Elevator';

interface FloorProps {
    floor: number;
    elevators: ElevatorState[];
    activeHallCalls: Set<string>;
    isTop: boolean;
    isBottom: boolean;
    onHallCall: (floor: number, direction: 'UP' | 'DOWN') => void;
    onElevatorClick: (elevatorId: number) => void;
}

export function Floor({ floor, elevators, activeHallCalls, isTop, isBottom, onHallCall, onElevatorClick }: FloorProps) {
    const upActive = activeHallCalls.has(`${floor}-UP`);
    const downActive = activeHallCalls.has(`${floor}-DOWN`);

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #e0e0e0',
            height: 64,
            '&:hover': { backgroundColor: '#fafafa' },
        }}>
            <Box sx={{ width: 50, textAlign: 'center' }}>
                <Typography variant="body1" fontWeight="bold">
                    {floor}
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 50,
                alignItems: 'center',
                gap: 0.25,
            }}>
                {!isTop && (
                    <IconButton
                        size="small"
                        onClick={() => onHallCall(floor, 'UP')}
                        sx={{
                            fontSize: 18,
                            p: 0.5,
                            color: upActive ? '#1976d2' : 'inherit',
                            backgroundColor: upActive ? '#e3f2fd' : 'transparent',
                        }}
                    >
                        ▲
                    </IconButton>
                )}
                {!isBottom && (
                    <IconButton
                        size="small"
                        onClick={() => onHallCall(floor, 'DOWN')}
                        sx={{
                            fontSize: 18,
                            p: 0.5,
                            color: downActive ? '#1976d2' : 'inherit',
                            backgroundColor: downActive ? '#e3f2fd' : 'transparent',
                        }}
                    >
                        ▼
                    </IconButton>
                )}
            </Box>

            <Box sx={{
                display: 'flex',
                flex: 1,
                height: '100%',
            }}>
                {elevators.map((elevator) => (
                    <Box
                        key={elevator.id}
                        sx={{
                            flex: 1,
                            borderLeft: '1px solid #e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Elevator
                            elevator={elevator}
                            floor={floor}
                            onElevatorCall={onElevatorClick}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}