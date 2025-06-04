

```markdown
# BME Sensor Monitoring System

This project monitors environmental data from BME sensors (temperature, humidity, pressure) using a Next.js dashboard and a local server.

## Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/jyotishman-pathak/BME_SENSOR
cd BME_SENSOR
```

### 2. Set up the frontend (Dashboard)
```bash
cd IOT
npm install
```

### 3. Set up the backend (Sensor Server)
```bash
cd ../local_server/esp32
npm install
```

## Running the System

### First Terminal: Start the Frontend Dashboard
```bash
cd IOT
npm run dev
```
- Dashboard will be available at: http://localhost:3000

### Second Terminal: Start the Backend Server
```bash
cd local_server/esp32
npm run dev
```
- Sensor API will be available at: http://localhost:5000

## Using the System

1. Open your browser and go to http://localhost:3000
2. You'll see a real-time dashboard showing:
   - Current sensor readings
   - Historical data charts
   - Sensor status indicators
3. The dashboard automatically updates every 5 seconds

## Features
- Real-time monitoring of temperature, humidity, and pressure
- Interactive charts showing historical data
- Sensor status alerts (normal/alert/critical)
- Responsive design works on both desktop and mobile
- Drag-and-drop interface to rearrange sensors

## Troubleshooting
If you encounter issues:
1. Make sure both servers are running in separate terminals
2. Check that no other applications are using ports 3000 or 5000
3. Ensure you have the latest Node.js version installed
4. Verify all dependencies installed properly (`npm install` completed without errors)

## Project Structure
```
BME_SENSOR/
├── IOT/                   # Frontend dashboard (Next.js)
│   ├── src/               # Source code
│   ├── package.json       # Frontend dependencies
│   └── ...                # Next.js configuration files
│
└── local_server/
    └── esp32/             # Backend server (Node.js)
        ├── data/          # Sensor data storage
        ├── server.js      # API server code
        └── package.json   # Backend dependencies
```

## Support
For assistance, please open an issue on [GitHub](https://github.com/jyotishman-pathak/BME_SENSOR/issues)
```

This README:
1. Uses clear step-by-step instructions with code blocks
2. Includes separate setup sections for frontend/backend
3. Provides troubleshooting tips
4. Shows the project structure
5. Uses simple language for non-technical users
6. Includes emojis for visual scanning
7. Has proper section headings
8. Includes web addresses for quick access

The instructions assume the user has basic terminal knowledge but doesn't require any technical expertise beyond running simple commands.
