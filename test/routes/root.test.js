"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("/v1/location route", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/v1/location"
  });
  t.equal(res.statusCode, 200);
  t.equal(res.headers["content-type"], "application/json; charset=utf-8");
  t.type(res.json().country, "string");
  t.type(res.json().countryCode, "string");
  t.type(res.json().region, "string");
  t.type(res.json().regionName, "string");
  t.type(res.json().city, "string");
  t.type(res.json().zip, "string");
  t.type(res.json().lat, "number");
  t.type(res.json().lon, "number");
  t.type(res.json().timezone, "string");
});

test("/v1/current/cordoba route - sucess", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/v1/current/cordoba"
  });
  t.equal(res.statusCode, 200);
  t.equal(res.headers["content-type"], "application/json; charset=utf-8");
  t.type(res.json().main, "object");
  t.type(res.json().visibility, "number");
  t.type(res.json().weather, "object");
  t.type(res.json().wind, "object");
});

test("/v1/current/chubut route - failed", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/v1/current/chubut"
  });
  t.equal(res.statusCode, 400);
  t.equal(res.headers["content-type"], "application/json; charset=utf-8");
  t.type(res.json().statusCode, "number");
  t.type(res.json().error, "string");
  t.type(res.json().message, "string");
});

test("/v1/forecast/cordoba route - sucess", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/v1/forecast/cordoba"
  });
  t.equal(res.statusCode, 200);
  t.equal(res.headers["content-type"], "application/json; charset=utf-8");
  t.type(res.json().list, "object");
});

test("/v1/forecast/chubut route - failed", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/v1/forecast/chubut"
  });
  t.equal(res.statusCode, 400);
  t.equal(res.headers["content-type"], "application/json; charset=utf-8");
  t.type(res.json().statusCode, "number");
  t.type(res.json().error, "string");
  t.type(res.json().message, "string");
});
