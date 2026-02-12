import { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { elevatorService } from './services/elevatorService';
import type { BuildingConfig, ElevatorState } from './types/elevator';

function App() {
    const [config, setConfig] = useState<BuildingConfig | null>(null);
    const [elevators, setElevators] = useState<ElevatorState[]>([]);

    useEffect(() => {
        elevatorService.getBuildingConfig().then(setConfig);
        elevatorService.getAllElevators().then(setElevators);
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Elevator System Simulation
            </Typography>

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
                    </Paper>
                ))}
            </Box>
        </Container>
    );
}

export default App;