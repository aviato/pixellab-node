import { API } from "../../constants";
import {
  ImageGenerationResponse,
  PixFluxImageGenerationParams,
  RequestSettings,
} from "../types";

export default async function generatePixfluxImage(
  clientSettings: RequestSettings,
  params: PixFluxImageGenerationParams
): Promise<ImageGenerationResponse> {
  try {
    const res = await fetch(`${clientSettings.baseUrl}${API.ROUTES.PIXFLUX}`, {
      method: "POST",
      headers: {
        ...clientSettings.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    return res.json() as Promise<ImageGenerationResponse>;
  } catch (error) {
    throw new Error(`Failed to generate PixFlux image: ${error}`);
  }
}
