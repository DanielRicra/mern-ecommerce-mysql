import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { 
   categoryRouter, 
   productRouter,
   purchaseRouter, 
   userRouter
} from './routes/index.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/purchases', purchaseRouter);
app.use('/api/categories', categoryRouter);

app.get('/', (req, res) => {
   res.send('Api is ready');
});

app.use((req, res) => {
   res.status(404).json({
      error: 'Route Not found'
   });
});

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => { 
   console.log(`Api running on http://localhost:${PORT}`);
});

export { app, server };