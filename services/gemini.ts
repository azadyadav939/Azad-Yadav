import { GoogleGenAI } from "@google/genai";
import { AspectRatio, AdStyle } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const STYLE_MODIFIERS: Record<AdStyle, string> = {
  Photorealistic: "high quality professional product photography, 8k resolution, studio lighting, highly detailed",
  Minimalist: "minimalist design, clean lines, soft lighting, ample negative space, pastel tones, modern",
  Vibrant: "vibrant colors, energetic atmosphere, bold contrast, dynamic composition, pop art influence",
  Luxury: "luxury aesthetic, gold and black accents, elegant textures, cinematic lighting, premium look",
  Illustrated: "digital illustration style, vector art aesthetic, clean shapes, flat design, colorful"
};

export const generateBannerImage = async (
  productDescription: string,
  aspectRatio: AspectRatio,
  style: AdStyle
): Promise<string> => {
  try {
    const model = 'imagen-4.0-generate-001';
    
    const enhancedPrompt = `
      Product advertisement background image for: ${productDescription}.
      Style: ${STYLE_MODIFIERS[style]}.
      No text overlays, no watermarks, clear copy space for ad text.
    `.trim();

    const response = await ai.models.generateImages({
      model: model,
      prompt: enhancedPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    const generatedImage = response.generatedImages?.[0]?.image;

    if (!generatedImage || !generatedImage.imageBytes) {
      throw new Error("No image data returned from API");
    }

    // Convert base64 bytes to a data URL
    return `data:image/jpeg;base64,${generatedImage.imageBytes}`;

  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};