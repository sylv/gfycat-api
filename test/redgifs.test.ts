import { redgifs } from "../src";

it.concurrent("should get post information", async () => {
  const post = await redgifs.getPost("AccomplishedRustyYellowbellylizard");
  expect(post.id).toBe("AccomplishedRustyYellowbellylizard");
  expect(post.author!.displayName).toBe("Kittyboitrap");
  expect(post.author!.userName).toBe("boixd27");
  expect(post.author!.url).toBeDefined();
  expect(post.resolution.height).toBe(1080);
  expect(post.resolution.width).toBe(576);
  expect(post.tags!.length).toBeGreaterThan(5);
  expect(post.createdAt.getTime()).toBeGreaterThan(new Date("2021").getTime());
});

it.concurrent("should get user information", async () => {
  const username = "boixd27";
  const user = await redgifs.getUser(username);
  expect(user.userName).toBe(username);
  expect(user.displayName).toBe("Kittyboitrap");
  expect(user.url).toBeDefined();
});

it("should get user posts", async () => {
  const username = "boixd27";
  const posts = await redgifs.getUserPosts(username);
  expect(posts.results.length).toBeGreaterThan(1);
  for (const post of posts.results) {
    expect(post.sources.length).toBeGreaterThan(1);
    expect(post.author!.userName).toBe(username);
  }
});

it.concurrent("should play nice with pagination", async () => {
  const username = "your_witch_alba";
  const first = await redgifs.getUserPosts(username, 10);
  expect(first.cursor).toBeDefined();
  const next = await redgifs.getUserPosts(username, 10, first.cursor!);
  expect(next.cursor).not.toEqual(first.cursor);
  expect(first.results[0].id).not.toEqual(next.results[0].id);
});
