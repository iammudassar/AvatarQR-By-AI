import { GoogleGenAI, Type } from "@google/genai";
import { AIColorSuggestion } from "../types";

// Safe retrieval of API Key to prevent runtime crashes if env is malformed
const getApiKey = (): string => {
  try {
    // 1. Try standard Vite environment variable
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      return import.meta.env.VITE_API_KEY;
    }
    // 2. Try process.env fallback (polyfilled in vite.config.ts)
    // @ts-ignore - process might not be defined in types but replaced by Vite
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    console.warn("Failed to retrieve API key from environment", e);
  }
  return "MISSING_KEY";
};

const apiKey = getApiKey();

const ai = new GoogleGenAI({ apiKey });

export const analyzeLogoAndSuggestColors = async (base64Image: string): Promise<AIColorSuggestion> => {
  // Fail fast if key is missing
  if (apiKey === "MISSING_KEY" || !apiKey) {
    console.error("Gemini API Key is missing. Please create a .env file with VITE_API_KEY=your_key");
    return {
      primary: '#000000',
      secondary: '#4b5563',
      accent: '#3b82f6'
    };
  }

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