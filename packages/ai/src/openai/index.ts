import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { AI_MODEL } from '../constants';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

export function getModel() {
    const model = new ChatOpenAI({
        modelName: AI_MODEL,
        temperature: 0,
        openAIApiKey: OPENAI_API_KEY,
    });

    const template = ChatPromptTemplate.fromMessages([
        [
            'system',
            "You are an AI language model designed to extract structured information from unstructured text. Provide the response in valid JSON format based on the user's input.",
        ],
        ['user', '{input}'],
    ]);

    const chain1 = template.pipe(model);

    return chain1;
}