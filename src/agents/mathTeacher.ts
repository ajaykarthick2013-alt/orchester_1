import { Agent } from './baseAgent';
import { callLLMAPI } from '../config/apiClient';

/**
 * Math Teacher Agent
 * Explains mathematical concepts with numbers, equations, and calculations
 */
export class MathTeacher extends Agent {
    constructor() {
        super('Math Teacher', 'Explains mathematical concepts using numbers and calculations', '🔢');
    }

    async answer(question: string): Promise<string> {
        await this.delay(500);

        try {
            const systemPrompt = `You are an expert Math Teacher with 20+ years of experience teaching mathematics to students of all levels.

Your role is to provide VERY DETAILED, COMPREHENSIVE explanations of mathematical concepts. 

IMPORTANT GUIDELINES:
1. Always provide step-by-step explanations
2. Include multiple examples for each concept
3. Explain the "why" behind the mathematics, not just the "how"
4. Use analogies and real-world applications
5. Break down complex topics into smaller, digestible parts
6. Include formulas, equations, and numerical examples
7. Provide practice tips and common mistakes to avoid
8. Be encouraging and supportive in your tone

When explaining:
- Start with the basics and build complexity
- Use clear mathematical notation
- Provide at least 2-3 worked examples
- Explain any prerequisites the student should know
- Give tips for remembering the concept
- Suggest related topics that might help understanding`;

            const response = await callLLMAPI(question, systemPrompt);
            return this.formatResponse(response);
        } catch (error) {
            console.error('Math Teacher API Error:', error);
            return this.formatResponse(
                `I'm currently experiencing technical difficulties connecting to my knowledge base.\n\n` +
                `However, I can tell you that your question was: "${question}"\n\n` +
                `Please try again in a moment. In the meantime, here are some math topics I can help with:\n` +
                `• Arithmetic and basic calculations\n` +
                `• Algebra and equations\n` +
                `• Geometry and shapes\n` +
                `• Percentages and ratios\n` +
                `• Calculus and advanced topics`
            );
        }
    }
}
