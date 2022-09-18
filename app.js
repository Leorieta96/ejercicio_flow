"use strict";

const path = require("path");
const AutoLoad = require("@fastify/autoload");
const fastifyEnv = require("@fastify/env");

const schemaENV = {
  type: "object",
  required: ["APP_ID"],
  properties: {
    APP_ID: {
      type: "string"
    },
    LANG: {
      type: "string",
      default: "es"
    },
    UNITS: {
      type: "string",
      default: "metric"
    }
  }
};

const options = {
  schema: schemaENV,
  dotenv: true
};

module.exports = async function (fastify, opts) {
  await fastify.register(require("@fastify/response-validation"));
  fastify
    .register(fastifyEnv, options)
    .ready((err) => {
      if (err) console.error(err);
    });
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts)
  });
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts)
  });
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });
};
