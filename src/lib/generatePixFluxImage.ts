import {
  ImageGenerationResponse,
  PixFluxImageGenerationParams,
  RequestSettings,
} from "../types";

/**
 * Generate an image using PixFlux.
 *
 * @param params - The parameters for image generation
 * @returns {Promise<ImageGenerationResponse>} Response containing the generated image and usage information
 * @throws {Error} If authentication fails or validation errors occur
 * @throws {HTTPError} For other HTTP-related errors
 *
 * @example
 * ```ts
 * const client = new PixelLabClient();
 * const result = await client.generatePixFluxImage({
 *   description: "A cute cat",
 *   image_size: { width: 400, height: 400 },
 * });
 * console.log(result?.image.type); // "base64"
 * ```
 */
export default async function generatePixfluxImage(
  clientSettings: RequestSettings,
  params: PixFluxImageGenerationParams
): Promise<ImageGenerationResponse> {
  try {
    const res = await fetch(
      `${clientSettings.baseUrl}/generate-image-pixflux`,
      {
        method: "POST",
        headers: {
          ...clientSettings.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );
    return res.json() as Promise<ImageGenerationResponse>;
  } catch (error) {
    throw new Error(`Failed to generate PixFlux image: ${error}`);
  }
}
