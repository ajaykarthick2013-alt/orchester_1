import { MathTeacher } from './agents/mathTeacher';
import { ScienceTeacher } from './agents/scienceTeacher';
import { HistoryTeacher } from './agents/historyTeacher';
import { ArtsTeacher } from './agents/artsTeacher';

export class Orchestrator {
    private mathTeacher: MathTeacher;
    private scienceTeacher: ScienceTeacher;
    private historyTeacher: HistoryTeacher;
    private artsTeacher: ArtsTeacher;

    constructor() {
        this.mathTeacher = new MathTeacher();
        this.scienceTeacher = new ScienceTeacher();
        this.historyTeacher = new HistoryTeacher();
        this.artsTeacher = new ArtsTeacher();
    }

    /**
     * Process a question and route it to the appropriate agents
     */
    async processQuestion(
        question: string, 
        enabledAgents: string[]
    ): Promise<Record<string, string>> {
        const responses: Record<string, string> = {};

        console.log(`\n📌 Processing question: "${question}"`);
        console.log(`🤖 Enabled agents: ${enabledAgents.join(', ')}`);

        for (const agent of enabledAgents) {
            try {
                console.log(`⚙️  Routing to ${agent} agent...`);
                
                switch (agent.toLowerCase()) {
                    case 'math':
                        responses['math'] = await this.mathTeacher.answer(question);
                        break;
                    case 'science':
                        responses['science'] = await this.scienceTeacher.answer(question);
                        break;
                    case 'history':
                        responses['history'] = await this.historyTeacher.answer(question);
                        break;
                    case 'arts':
                        responses['arts'] = await this.artsTeacher.answer(question);
                        break;
                    default:
                        console.warn(`⚠️  Unknown agent: ${agent}`);
                }
            } catch (error) {
                console.error(`❌ Error with ${agent} agent:`, error);
                responses[agent] = `Error: Failed to get response from ${agent} teacher`;
            }
        }

        console.log(`✅ Processing complete. Generated ${Object.keys(responses).length} responses\n`);
        return responses;
    }

    /**
     * Detect which agents would be best suited for a question
     */
    detectAppropriateAgents(question: string): string[] {
        const lowerQuestion = question.toLowerCase();
        const suggestedAgents: string[] = [];

        // Math keywords
        const mathKeywords = ['calculate', 'solve', 'equation', 'algebra', 'geometry', 'number', 'math', 'add', 'multiply', 'divide', 'percent', 'formula'];
        if (mathKeywords.some(kw => lowerQuestion.includes(kw))) {
            suggestedAgents.push('math');
        }

        // Science keywords
        const scienceKeywords = ['science', 'physics', 'chemistry', 'biology', 'atom', 'reaction', 'experiment', 'element', 'force', 'energy'];
        if (scienceKeywords.some(kw => lowerQuestion.includes(kw))) {
            suggestedAgents.push('science');
        }

        // History keywords
        const historyKeywords = ['history', 'war', 'ancient', 'medieval', 'revolution', 'empire', 'timeline', 'century', 'historical', 'when'];
        if (historyKeywords.some(kw => lowerQuestion.includes(kw))) {
            suggestedAgents.push('history');
        }

        // Arts keywords
        const artsKeywords = ['draw', 'art', 'painting', 'sketch', 'design', 'color', 'image', 'picture', 'illustration', 'creative'];
        if (artsKeywords.some(kw => lowerQuestion.includes(kw))) {
            suggestedAgents.push('arts');
        }

        return suggestedAgents.length > 0 ? suggestedAgents : ['math', 'science', 'history', 'arts'];
    }
}
