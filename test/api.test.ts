import { gfycat } from "../src";
import fetch from "cross-fetch";

it("should generate accurate profile urls", async () => {
  const getProfileUrl = jest.spyOn(gfycat as any, "getProfileUrl");
  const user = await gfycat.getUser("gifgenerator");
  expect(getProfileUrl).toBeCalled();
  expect(user.url).toBeDefined();
  const response = await fetch(user.url, { method: "HEAD" });
  expect(response.status).toBe(200);
  expect(response.ok).toBeTruthy();
});
