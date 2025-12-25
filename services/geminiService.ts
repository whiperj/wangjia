
import { GoogleGenAI, Type } from "@google/genai";
import { QuizConfig, QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function generateQuizFromMaterial(config: QuizConfig): Promise<QuizQuestion[]> {
  const prompt = `Generate an English test based on the material: ${config.materialName}.
  Config:
  - Difficulty: ${config.difficulty}
  - Quantity: ${config.quantity}
  - Question Type: ${config.type}
  - Include Chinese Analysis: ${config.includeChineseAnalysis}
  - Focus on Grammar: ${config.focusGrammar}
  
  Return the quiz as a JSON array of objects.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            type: { type: Type.STRING },
            text: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING },
            translation: { type: Type.STRING },
          },
          required: ['id', 'type', 'text', 'correctAnswer', 'explanation', 'translation']
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
}

export async function getWordDefinition(word: string): Promise<{ definition: string; pronunciation?: string; example?: string }> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a concise Chinese definition, pronunciation, and an English example sentence for the word: "${word}".`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          definition: { type: Type.STRING },
          pronunciation: { type: Type.STRING },
          example: { type: Type.STRING },
        },
        required: ['definition']
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
