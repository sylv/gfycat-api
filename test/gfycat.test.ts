import { gfycat } from "../src";

it.concurrent("should get post information", async () => {
  const post = await gfycat.getPost("bronzethreadbaregavial");
  expect(post.id).toBe("BronzeThreadbareGavial");
  expect(post.author!.displayName).toBe("GIF Generator");
  expect(post.author!.userName).toBe("gifgenerator");
  expect(post.author!.url).toBeDefined();
  expect(post.md5).toBe("09cc515e832ce092fe4ee12f4368f77f");
  expect(post.resolution.height).toBe(610);
  expect(post.resolution.width).toBe(952);
  expect(post.tags!.length).toBeGreaterThan(5);
  expect(post.title).toBe("Steven Universe - Long time no see");
  expect(post.createdAt.getTime()).toBeGreaterThan(new Date("2018").getTime());
});

it.concurrent("should handle posts with no author", async () => {
  const post = await gfycat.getPost("aridblindharvestmouse");
  expect(post.author).toBeUndefined();
  expect(post.description).toBeUndefined();
  expect(post.title).toBe("Fortnite default dance meme");
});

it.concurrent("should get user information", async () => {
  const user = await gfycat.getUser("gifgenerator");
  expect(user.userName).toBe("gifgenerator");
  expect(user.displayName).toBe("GIF Generator");
  expect(user.url).toBeDefined();
});

it.concurrent("should get user posts", async () => {
  const posts = await gfycat.getUserPosts("boojibs");
  expect(posts.results.length).toBeGreaterThan(1);
  for (const post of posts.results) {
    expect(post.sources.length).toBeGreaterThan(1);
    expect(post.author!.userName).toBe("boojibs");
  }
});

it.concurrent("should play nice with pagination", async () => {
  const username = "gifgenerator";
  const first = await gfycat.getUserPosts(username, 10);
  expect(first.cursor).toBeDefined();
  const next = await gfycat.getUserPosts(username, 10, first.cursor!);
  expect(next.cursor).not.toEqual(first.cursor);
  expect(first.results[0].id).not.toEqual(next.results[0].id);
});

it.concurrent("should add mp4 url to sources when it doesnt already exist", async () => {
  const id = "AnchoredGlaringArmadillo";
  const post = await gfycat.getPost(id);
  expect(post.sources.find((source) => source.type === "mp4")).toBeDefined();
});
