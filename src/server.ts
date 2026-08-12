import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { Orchestrator } from './orchestrator';

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Initialize orchestrator
const orchestrator = new Orchestrator();

// Routes
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API endpoint for processing questions
app.post('/api/process', async (req: Request, res: Response) => {
    try {
        const { question, agents } = req.body;

        if (!question || !agents || agents.length === 0) {
            return res.status(400).json({ 
                error: 'Missing question or agents' 
            });
        }

        const responses = await orchestrator.processQuestion(question, agents);
        
        res.json({ responses });
    } catch (error) {
        console.error('Error processing question:', error);
        res.status(500).json({ 
            error: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(port, () => {
    console.log(`🎭 Orchester server running at http://localhost:${port}`);
    console.log('Ready to route questions to specialized tutors!');
});
