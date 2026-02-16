# Elevator System Simulation

## Requirements

- Node.js 18+
- npm

## Frontend

```bash
cd elevator-system-simulation-frontend
npm install
npm run dev
```

Starts on `http://localhost:2000`. Proxies `/api` -> backend (`localhost:8099`).

## Startup order

1. Backend first (frontend requires the API)
2. Frontend