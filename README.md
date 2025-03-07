# pixellab-node
A simple client for interacting with the [Pixel Lab Developer API](http://api.pixellab.ai/v1/docs).

In order to process image data you can use the Node API (see example below) or a library like [JIMP](https://github.com/jimp-dev/jimp) or [sharp](https://github.com/lovell/sharp)

## Installation
* `npm i` NOTE: project requries Node 18+
* Create a `.env` file with your Pixellab API key (see `.env.example`)
* Import and initialize the client

Simple NextJS Example
```ts
import PixelLabClient, {
  AnimateSkeletonResponse,
  Base64Image,
  SkeletonKeypoints,
} from "pixellab-node";
import Image from "next/image";
import fs from "fs/promises";
import path from "path";
import corgiJsonData from "../../public/skeleton_keypoints.json";

async function getImageAsBase64(imageName: string): Promise<string> {
  try {
    const imagePath = path.join(process.cwd(), "public", imageName);
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString("base64");
    return base64Image;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default async function Home() {
  const client = new PixelLabClient();
  const startingImage = await getImageAsBase64("corgi-test-dog.png");
  const skeletonResult: AnimateSkeletonResponse =
    await client.animateSkeletonFromSkeleton({
      skeleton_keypoints: corgiJsonData.pose_keypoints as SkeletonKeypoints,
      image_size: { width: 64, height: 64 },
      reference_image: { type: "base64", base64: startingImage },
    });

  return (
    <main className="flex flex-row items-center bg-slate-700 text-white">
      {skeletonResult.images.map((image: Base64Image, index: number) => {
        return (
          <Image
            alt={`Corgi Test Animation (${index})`}
            key={index}
            src={`data:image/png;base64,${image.base64}`}
            width={64}
            height={64}
          />
        );
      })}
    </main>
  );
}

```
![corgo-test](https://github.com/user-attachments/assets/8d4a7e0f-a0d5-4272-bdbf-3f3a6c230a7b)

Note: the above example uses skeleton keypoint data exported from Aesprite

## Authentication
You must use your Pixellab API key in order to authenticate. Logged in users can find that [here](https://www.pixellab.ai/pixellab-api)
Remember: never share your API key with anyone
