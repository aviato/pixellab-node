import { API } from "../constants.js";
import {
  AnimateSkeletonResponse,
  AnimateFromSkeletonParams,
  RequestSettings,
} from "../types.js";

export default async function animateSkeletonFromSkeleton(
  clientSettings: RequestSettings,
  params: AnimateFromSkeletonParams
): Promise<AnimateSkeletonResponse> {
  try {
    const res = await fetch(
      `${clientSettings.baseUrl}${API.ROUTES.ANIMATE_SKELETON_WITH_SKELETON}`,
      {
        method: "POST",
        headers: {
          ...clientSettings.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );
    return res.json() as Promise<AnimateSkeletonResponse>;
  } catch (error) {
    throw new Error(`Failed to animate skeleton with skeleton: ${error}`);
  }
}
