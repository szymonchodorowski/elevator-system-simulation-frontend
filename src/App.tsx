import { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Chip } from '@mui/material';
import { elevatorService } from './services/elevatorService';
import { useElevatorSSE } from './hooks/useElevatorSSE';
import type { BuildingConfig } from './types/elevator';

function App() {
    const [config, setConfig] = useState<BuildingConfig | null>(null);
    const { elevators, connected } = useElevatorSSE();

    useEffect(() => {
        elevatorService.getBuildingConfig().then(setConfig);
    }, []);

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
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography>Floors: {config.numberOfFloors}</Typography>
                    <Typography>Elevators: {config.numberOfElevators}</Typography>
                </Paper>
            )}

            <Box sx={{ display: 'flex', gap: 2 }}>
                {elevators.map((elevator) => (
                    <Paper key={elevator.id} sx={{ p: 2, flex: 1 }}>
                        <Typography variant="h6">Elevator {elevator.id}</Typography>
                        <Typography>Floor: {elevator.currentFloor}</Typography>
                        <Typography>Direction: {elevator.direction}</Typography>
                        <Typography>Doors: {elevator.doorStatus}</Typography>
                        <Typography>Targets: {elevator.targetFloors.join(', ') || 'none'}</Typography>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
}

export default App;