import {
  AnimateSkeletonResponse,
  AnimateWithSkeletonParams,
  RequestSettings
} from '../types';

/**
* Creates a pixel art animation based on the provided parameters.
* 
* @param params - The request parameters for animating a skeleton with a skeleton
* @returns {Promise<AnimateSkeletonResponse>} Response containing the generated images and usage information
* @throws {Error} If authentication fails or validation errors occur
* @throws {HTTPError} For other HTTP-related errors
*
* @example
* ```ts
* const client = new PixelLabClient();
* const result = await client.animateSkeletonFromSkeleton({
*  view: "side",
*  direction: "east",
*  image_size: { width: 64, height: 64 },
*  reference_image: referenceImageData,
*  skeleton_keypoints: skeletonKeypoints,
* });
* console.log(result?.images.length); // 3
* console.log(result?.images[0]?.type); // "base64"
* ```
*/
export default async function animateSkeletonFromSkeleton(
  clientSettings: RequestSettings,
  params: AnimateWithSkeletonParams): Promise<AnimateSkeletonResponse> {
  try {

    const res = await fetch(`${clientSettings.baseUrl}/animate-with-skeleton`, {
      method: 'POST',
      headers: {
        ...clientSettings.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return res.json() as Promise<AnimateSkeletonResponse>;
  } catch (error) {
    throw new Error(`Failed to animate skeleton with skeleton: ${error}`);
  }
} 
