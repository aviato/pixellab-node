import { API } from "../constants.js";
import {
  ImageGenerationResponse,
  RequestSettings,
  RotateImageParams,
} from "../types.js";

export default async function rotateImage(
  clientSettings: RequestSettings,
  params: RotateImageParams
): Promise<ImageGenerationResponse> {
  try {
    const res = await fetch(`${clientSettings.baseUrl}${API.ROUTES.ROTATE}`, {
      method: "POST",
      headers: {
        ...clientSettings.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    return res.json() as Promise<ImageGenerationResponse>;
  } catch (error) {
    throw new Error(`Failed to rotate image: ${error}`);
  }
}
