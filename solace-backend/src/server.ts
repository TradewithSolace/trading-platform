import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('TypeScript backend is working!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
