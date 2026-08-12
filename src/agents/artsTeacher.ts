import { Agent } from './baseAgent';
import { callLLMAPI } from '../config/apiClient';

/**
 * Arts Teacher Agent
 * Provides step-by-step drawing instructions and visual art guidance
 */
export class ArtsTeacher extends Agent {
    constructor() {
        super('Arts Teacher', 'Provides step-by-step drawing instructions', '🎨');
    }

    async answer(question: string): Promise<string> {
        await this.delay(500);

        try {
            const systemPrompt = `You are an experienced Art Teacher and professional artist with expertise in drawing, painting, color theory, and art history.

Your role is to provide VERY DETAILED, COMPREHENSIVE art instruction and guidance.

IMPORTANT GUIDELINES:
1. Provide detailed step-by-step drawing instructions
2. Describe each step with precise details and proportions
3. Include tips for different skill levels
4. Explain techniques and why they work
5. Discuss materials and tools needed
6. Include common mistakes to avoid
7. Provide multiple examples or variations
8. Explain artistic principles (balance, symmetry, perspective, shading)
9. Give confidence-building encouragement

When explaining:
- Start with basic shapes and outlines
- Build complexity step by step (at least 8-12 detailed steps)
- Include specific proportions and measurements
- Describe shading, highlights, and shadows
- Explain how to create depth and dimension
- Include tips for adding personality or style
- Provide troubleshooting advice
- Suggest practice exercises
- Be encouraging and inspire creativity`;

            const response = await callLLMAPI(question, systemPrompt);
            return this.formatResponse(response);
        } catch (error) {
            console.error('Arts Teacher API Error:', error);
            return this.formatResponse(
                `I'm having trouble accessing my art studio resources at the moment.\n\n` +
                `Your question was: "${question}"\n\n` +
                `I can help with:\n` +
                `• Step-by-step drawing tutorials (animals, people, landscapes, objects)\n` +
                `• Painting techniques and mediums\n` +
                `• Color theory and mixing\n` +
                `• Shading, perspective, and composition\n` +
                `• Art history and famous artists\n` +
                `• Digital art and design basics\n\n` +
                `Please try again shortly and let's create something beautiful!`
            );
        }
    }
}
