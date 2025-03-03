import {
  ImageGenerationResponse,
  InpaintImageParams,
  RequestSettings
} from '../types';

/**
* Create pixel art based on the provided parameters.
* 
* @param params - The request parameters for creating a pixel art image
* @returns {Promise<ImageGenerationResponse>} Response containing the image and usage information
* @throws {Error} If authentication fails or validation errors occur
* @throws {HTTPError} For other HTTP-related errors
*
* @example
* ```ts
* const client = new PixelLabClient();
* const result = await client.inpaintImage({
*  description: "A cute cat",
*  mask: maskImageData,
*  inptainting_image: inpaintingImageData,
*  image_size: { width: 64, height: 64 },
* });
* console.log(result?.image.type); // "base64"
* ```
*/
export default async function inpaintImage(clientSettings: RequestSettings, params: InpaintImageParams): Promise<ImageGenerationResponse> {
  try {
    const res = await fetch(`${clientSettings.baseUrl}/inpaint`, {
      method: 'POST',
      headers: {
        ...clientSettings.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return res.json() as Promise<ImageGenerationResponse>;
  } catch (error) {
    throw new Error(`Failed to inpaint image: ${error}`);
  }
}
