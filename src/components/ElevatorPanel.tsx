import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';

interface ElevatorPanelProps {
    elevatorId: number;
    numberOfFloors: number;
    currentFloor: number;
    targetFloors: number[];
    onSelectFloor: (floor: number) => void;
    onClose: () => void;
}

export function ElevatorPanel({ elevatorId, numberOfFloors, currentFloor, targetFloors, onSelectFloor, onClose }: ElevatorPanelProps) {
    const floors = Array.from({ length: numberOfFloors }, (_, i) => numberOfFloors - 1 - i);

    return (
        <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Elevator {elevatorId} — Floor {currentFloor}
                </Typography>
                <IconButton size="small" onClick={onClose}>
                    ✕
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pt: 1 }}>
                    {floors.map((floor) => (
                        <Button
                            key={floor}
                            variant={targetFloors.includes(floor) ? 'contained' : 'outlined'}
                            size="small"
                            disabled={floor === currentFloor}
                            onClick={() => onSelectFloor(floor)}
                            sx={{ minWidth: 44, minHeight: 44 }}
                        >
                            {floor}
                        </Button>
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
}