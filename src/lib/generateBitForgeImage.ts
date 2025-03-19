import { API } from "../constants.js";
import {
  BitForgeImageGenerationParams,
  ImageGenerationResponse,
  RequestSettings,
} from "../types.js";

export default async function generateBitForgeImage(
  clientSettings: RequestSettings,
  params: BitForgeImageGenerationParams
): Promise<ImageGenerationResponse> {
  try {
    const res = await fetch(`${clientSettings.baseUrl}${API.ROUTES.BITFORGE}`, {
      method: "POST",
      headers: {
        ...clientSettings.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    return res.json() as Promise<ImageGenerationResponse>;
  } catch (error) {
    throw new Error(`Failed to generate BitForge image: ${error}`);
  }
}
