import { GoogleGenAI, Type } from "@google/genai";
import { AIColorSuggestion } from "../types";

// Support both standard process.env (Node/AI Studio) and Vite's import.meta.env
// This makes the code portable for users hosting it themselves.
const getApiKey = () => {
  if (typeof process !== 'undefined' && process.env.API_KEY) {
    return process.env.API_KEY;
  }
  // @ts-ignore - handling Vite environment
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_KEY) {
    // @ts-ignore
    return import.meta.env.VITE_API_KEY;
  }
  return '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const analyzeLogoAndSuggestColors = async (base64Image: string): Promise<AIColorSuggestion> => {
  try {
    // Remove header if present (e.g., "data:image/png;base64,")
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            text: `Analyze this logo image. 
            Identify the dominant primary color (usually the main brand color).
            Identify a suitable secondary color (usually a darker or contrasting shade suitable for QR code elements).
            Identify an accent color (maybe a lighter shade or complementary color).
            
            Return hex codes for these 3 colors. Ensure they have good contrast against a white background.`
          },
          {
            inlineData: {
              mimeType: "image/png", // Assuming PNG/JPEG, Gemini handles it well
              data: cleanBase64
            }
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primary: { type: Type.STRING, description: "Main brand color hex code" },
            secondary: { type: Type.STRING, description: "Contrasting secondary color hex code" },
            accent: { type: Type.STRING, description: "Accent color hex code" }
          },
          required: ["primary", "secondary", "accent"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    
    // Fallback if parsing fails or returns empty
    if (!result.primary) {
      throw new Error("Could not extract colors");
    }

    return {
      primary: result.primary,
      secondary: result.secondary,
      accent: result.accent
    };

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Return safe default fallback
    return {
      primary: '#000000',
      secondary: '#4b5563',
      accent: '#3b82f6'
    };
  }
};