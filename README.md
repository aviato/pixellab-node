# pixellab-node
Node.js API for interacting with the [Pixel Lab Developer API](http://api.pixellab.ai/v1/docs).

This package is very bare-bones, so in order to process image data you will need to use something like [JIMP](https://github.com/jimp-dev/jimp) or [sharp](https://github.com/lovell/sharp)

## Installation
* `npm i` NOTE: project requries Node 18+
* Create a `.env` file with your Pixellab API key (see `.env.example`)
* Import and initialize the client
```ts
const client = new PixelLabClient();
const result = await client.generatePixFluxImage({
  description: "A cute cat",
  image_size: { width: 400, height: 400 },
});
console.log(result?.image.type); // "base64"
```

## Authentication
You must use your Pixellab API key in order to authenticate. Logged in users can find that [here](https://www.pixellab.ai/pixellab-api)
Remember: never share your API key with anyone

## Next Steps
Working on adding tests and getting a stable release out there. For the time being this package might be unstable.
