import { API } from "../constants";
import {
  AnimateSkeletonResponse,
  AnimateWithTextParams,
  RequestSettings,
} from "../types";

export default async function animateSkeletonFromText(
  clientSettings: RequestSettings,
  params: AnimateWithTextParams
): Promise<AnimateSkeletonResponse> {
  try {
    const res = await fetch(
      `${clientSettings.baseUrl}${API.ROUTES.ANIMATE_SKELETON_WITH_TEXT}`,
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
    throw new Error(`Failed to animate skeleton with text: ${error}`);
  }
}
