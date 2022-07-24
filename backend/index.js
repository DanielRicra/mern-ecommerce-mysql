import express from 'express';
import { PORT } from './config.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.send('Api is ready');
});

app.use((req, res) => {
   res.status(404).json({
      error: 'Not found'
   });
});

app.listen(PORT, () => { 
   console.log(`Api running on http://localhost:${PORT}`);
});