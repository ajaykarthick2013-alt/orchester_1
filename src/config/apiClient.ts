import dotenv from 'dotenv';

dotenv.config();

export interface APIConfig {
    endpoint: string;
    apiKey: string;
    modelName: string;
}

export const apiConfig: APIConfig = {
    endpoint: process.env.API_ENDPOINT || 'https://vibe-proxy-gqv4.onrender.com/v1/chat/completions',
    apiKey: process.env.API_KEY || 'sk-vibe-summer-2026',
    modelName: process.env.MODEL_NAME || 'class-chat-model'
};

/**
 * Call the LLM API with a given prompt
 */
export async function callLLMAPI(userMessage: string, systemPrompt?: string): Promise<string> {
    try {
        const messages = [];
        
        if (systemPrompt) {
            messages.push({
                role: 'system',
                content: systemPrompt
            });
        }
        
        messages.push({
            role: 'user',
            content: userMessage
        });

        const response = await fetch(apiConfig.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiConfig.apiKey}`
            },
            body: JSON.stringify({
                model: apiConfig.modelName,
                messages: messages
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json() as any;
        
        // Handle different response formats
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message?.content || 'No response content';
        }
        
        throw new Error('Invalid API response format');
    } catch (error) {
        console.error('LLM API Error:', error);
        throw error;
    }
}
