import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors"
const app = express();
const port = 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const parentDir = path.join(__dirname, '..');

// Middleware to parse JSON body
app.use(bodyParser.json());
app.use(cors())
// Endpoint to receive data
app.post('/endpoint', (req, res) => {
  console.log("Received data:");
  console.log(JSON.stringify(req.body, null, 2));

  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const filePath = path.join(parentDir, `data_${timestamp}.json`);

  fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
  res.send('✅ Data received successfully!');
});


app.get('/data', (req, res) => {
  try {
    const files = fs.readdirSync(parentDir)
      .filter(file => file.startsWith('data_') && file.endsWith('.json'))
      .sort()
      .reverse(); 
    if (files.length === 0) {
      return res.status(404).send(' No data files found.');
    }

    const latestFile = path.join(parentDir, files[0]);
    const data = fs.readFileSync(latestFile, 'utf8');
    const jsonData = JSON.parse(data);

    res.json(jsonData);
  } catch (error) {
    console.error('Error reading data file:', error);
    res.status(500).send('Error reading data file.');
  }
});


app.get('/', (req, res) => {
  res.send(' Webserver running! Send data to /endpoint');
});

app.get('/all-data', (req, res) => {
  try {
    const files = fs.readdirSync(parentDir)
      .filter(file => file.startsWith('data_') && file.endsWith('.json'))
      .sort()
      .reverse(); 

    if (files.length === 0) {
      return res.status(404).send(' No data files found.');
    }

   
    const allData = files.map(file => {
      const filePath = path.join(parentDir, file);
      const fileData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileData);
    });

    res.json(allData);
  } catch (error) {
    console.error('Error reading data files:', error);
    res.status(500).send(' Error reading data files.');
  }
});





// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});