import {
  ImageGenerationResponse,
  RequestSettings,
  RotateImageParams,
} from "../types";

/**
 * Creates a pixel art animation based on the provided parameters.
 *
 * @param params - The request parameters for rotating a pixel art image
 * @returns {Promise<ImageGenerationResponse>} Response containing the rotated image and usage information
 * @throws {Error} If authentication fails or validation errors occur
 * @throws {HTTPError} For other HTTP-related errors
 *
 * @example
 * ```ts
 * const client = new PixelLabClient();
 * const result = await client.rotateImage({
 *  from_view: "side",
 *  to_view: "side",
 *  from_direction: "east",
 *  to_direction: "west",
 *  image_size: { width: 64, height: 64 },
 *  from_image: fromImageData,
 * });
 * console.log(result?.image.type); // "base64"
 * ```
 */
export default async function rotateImage(
  clientSettings: RequestSettings,
  params: RotateImageParams
): Promise<ImageGenerationResponse> {
  try {
    const res = await fetch(`${clientSettings.baseUrl}/rotate`, {
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
