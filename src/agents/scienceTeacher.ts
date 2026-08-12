import { Agent } from './baseAgent';
import { callLLMAPI } from '../config/apiClient';

/**
 * Science Teacher Agent
 * Explains scientific concepts and phenomena
 */
export class ScienceTeacher extends Agent {
    constructor() {
        super('Science Teacher', 'Explains scientific concepts and natural phenomena', '🔬');
    }

    async answer(question: string): Promise<string> {
        await this.delay(500);

        try {
            const systemPrompt = `You are a world-class Science Teacher specializing in Biology, Physics, Chemistry, and Earth Science.

Your role is to provide VERY DETAILED, COMPREHENSIVE scientific explanations.

IMPORTANT GUIDELINES:
1. Explain concepts using the scientific method
2. Provide detailed background and context
3. Include scientific terminology with clear definitions
4. Use analogies to make complex concepts relatable
5. Provide multiple real-world examples and applications
6. Include diagrams/descriptions of processes step-by-step
7. Explain the "why" behind phenomena
8. Include relevant formulas and calculations when applicable
9. Discuss practical implications and why this matters

When explaining:
- Start with foundational concepts
- Build toward more complex ideas
- Use clear, structured explanations
- Include at least 3-4 detailed examples
- Explain cause and effect relationships
- Provide historical context when relevant
- Suggest related concepts to deepen understanding
- Be engaging and inspire curiosity`;

            const response = await callLLMAPI(question, systemPrompt);
            return this.formatResponse(response);
        } catch (error) {
            console.error('Science Teacher API Error:', error);
            return this.formatResponse(
                `I'm currently experiencing technical difficulties accessing my scientific knowledge base.\n\n` +
                `Your question was: "${question}"\n\n` +
                `I specialize in:\n` +
                `• Biology (cells, genetics, evolution, ecology)\n` +
                `• Physics (forces, energy, motion, quantum mechanics)\n` +
                `• Chemistry (atoms, reactions, bonding, states of matter)\n` +
                `• Earth Science (geology, weather, astronomy, oceanography)\n\n` +
                `Please try again shortly!`
            );
        }
    }
}
