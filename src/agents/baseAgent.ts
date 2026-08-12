/**
 * Base Agent class that all tutors extend
 */
export abstract class Agent {
    protected name: string;
    protected description: string;
    protected emoji: string;

    constructor(name: string, description: string, emoji: string) {
        this.name = name;
        this.description = description;
        this.emoji = emoji;
    }

    /**
     * Process a question and return an answer
     */
    abstract answer(question: string): Promise<string>;

    /**
     * Format response with agent info
     */
    protected formatResponse(content: string): string {
        return `${this.emoji} ${this.name}:\n\n${content}`;
    }

    /**
     * Add delay to simulate processing
     */
    protected async delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
