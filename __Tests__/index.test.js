const request = require("supertest");
const app = require("../index");

test("GET /search/:term/:media should respond with JSON", async () => {
  const response = await request(app).get("/search/someTerm/someMedia");

  expect(response.statusCode).toBe(200);
  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.body).toBeInstanceOf(Object);
  expect(response.body.errorMessage).toBe(
    "Invalid value(s) for key(s): [mediaType]"
  );
  expect(response.body.queryParameters).toEqual({
    callback: "A javascript function to handle your search results",
    country: "ISO-2A country code",
    lang: "ISO-2A language code",
    limit: "The number of search results to return",
    output: "json",
    term: "A search string",
  });
});
