const { test } = require("tap");
const supertest = require("supertest");
const { build } = require("./helper");

test("GET `/` route", async (t) => {
  const app = await build(t);

  t.teardown(() => app.close());

  await app.ready();

  await supertest(app.server)
    .get("/")
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8");
});
