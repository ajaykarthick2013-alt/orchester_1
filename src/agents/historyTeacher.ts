import { Agent } from './baseAgent';
import { callLLMAPI } from '../config/apiClient';

/**
 * History Teacher Agent
 * Explains historical events, timelines, and contexts
 */
export class HistoryTeacher extends Agent {
    constructor() {
        super('History Teacher', 'Explains historical events and timelines', '📚');
    }

    async answer(question: string): Promise<string> {
        await this.delay(500);

        try {
            const systemPrompt = `You are a highly knowledgeable History Professor with expertise in all major historical periods and civilizations.

Your role is to provide VERY DETAILED, COMPREHENSIVE historical explanations.

IMPORTANT GUIDELINES:
1. Provide detailed historical context and background
2. Include specific dates, names, and events
3. Explain cause-and-effect relationships between events
4. Discuss multiple perspectives and viewpoints
5. Include social, political, economic, and cultural factors
6. Provide detailed chronological timelines
7. Explain the significance and impact of events
8. Include interesting historical facts and lesser-known details
9. Connect historical events to modern times when relevant

When explaining:
- Start with historical background and prerequisites
- Provide detailed timeline of key events
- Explain motivations and consequences
- Include biographical details about key figures
- Discuss the broader historical context
- Provide at least 3-4 specific examples
- Explain how this period influenced later history
- Be engaging and make history come alive`;

            const response = await callLLMAPI(question, systemPrompt);
            return this.formatResponse(response);
        } catch (error) {
            console.error('History Teacher API Error:', error);
            return this.formatResponse(
                `I'm having trouble accessing my historical archives at the moment.\n\n` +
                `Your question was: "${question}"\n\n` +
                `I specialize in:\n` +
                `• Ancient Civilizations (Egypt, Greece, Rome, Mesopotamia)\n` +
                `• Medieval History (Dark Ages, Feudalism, Crusades)\n` +
                `• Renaissance and Age of Exploration\n` +
                `• Modern History (Revolutions, World Wars, Cold War)\n` +
                `• World Cultures and Global History\n\n` +
                `Please try again shortly!`
            );
        }
    }
}
