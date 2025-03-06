import { API } from "../constants";
import {
  ImageGenerationResponse,
  InpaintImageParams,
  RequestSettings,
} from "../types";

export default async function inpaintImage(
  clientSettings: RequestSettings,
  params: InpaintImageParams
): Promise<ImageGenerationResponse> {
  try {
    const res = await fetch(`${clientSettings.baseUrl}${API.ROUTES.INPAINT}`, {
      method: "POST",
      headers: {
        ...clientSettings.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    return res.json() as Promise<ImageGenerationResponse>;
  } catch (error) {
    throw new Error(`Failed to inpaint image: ${error}`);
  }
}
