const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  await fastify.register(require("@fastify/swagger"), {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: "Documentacion endpoint",
        version: "0.1.0"
      },
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"]
    },
    uiConfig: {
      docExpansion: "full",
      deepLinking: false
    },
    transformStaticCSP: (header) => header,
    exposeRoute: true
  });
});
