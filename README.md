# gfycat-api

**This is not an official API in any way, and may break without warning.**

An API for getting posts from [gfycat](https://www.gfycat.com/) and [redgifs](https://redgifs.com/). See [tests](/test) for examples. May or may not work in the browser because it seems they gave up on CORS and allow anything.

```ts
import { gfycat, redgifs } from "gfycat-api";

const post = await gfycat.getPost("aridblindharvestmouse");
console.log(post);
// {
//   id: 'AridBlindHarvestmouse',
//   title: 'Fortnite default dance meme',
//   source: 'https://gfycat.com/MadeupBossyFish',
//   description: undefined,
//   rating: 'PG-13',
//   posterUrl: 'https://thumbs.gfycat.com/AridBlindHarvestmouse-poster.jpg',
//   tags: [ 'People & Blogs', 'Thefortnite Alert' ],
//   nsfw: false,
//   md5: undefined,
//   createdAt: 2018-09-25T07:27:30.000Z,
//   author: undefined,
//   votes: { likes: 4, dislikes: 0 },
//   resolution: { height: 480, width: 480 },
//   sources: [
//     {
//       type: 'max1mbGif',
//       url: 'https://thumbs.gfycat.com/AridBlindHarvestmouse-max-1mb.gif',
//       height: 280,
//       width: 280,
//       size: 909875
//     },
//     {
//       type: 'webm',
//       url: 'https://giant.gfycat.com/AridBlindHarvestmouse.webm',
//       height: 480,
//       width: 480,
//       size: 380532
//     },
//     ...
//   ],
//   meta: {
//     frameRate: 30.03003,
//     frameCount: 200,
//     hasAudio: false,
//     hasTransparency: false,
//     averageColour: '#E3FFFE'
//   }
// }
```

# todo

- [ ] Some posts have URLs that outright don't work, we should try filter these out. An example is [this post](https://api.gfycat.com/v1/gfycats/AnchoredGlaringArmadillo) where the "largeGif" source doesn't work. This seems to be random and isn't just restricted to urls in `content_urls`, but the website must filter them out somehow so it should be possible for us to do the same. 