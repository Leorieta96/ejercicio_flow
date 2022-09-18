const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const URL_OPEN_WEATHER = "https://api.openweathermap.org/data/2.5/";
const URL_CURRENT = `${URL_OPEN_WEATHER}/weather?appid=${process.env.APP_ID}&lang=${process.env.LANG}&units=${process.env.UNITS}`;
const URL_FORECAST = `${URL_OPEN_WEATHER}/forecast?appid=${process.env.APP_ID}&lang=${process.env.LANG}&units=${process.env.UNITS}`;

const schemaLocation = {
  description: "Devuelve los datos de ubicación city según ip-api.",
  response: {
    200: {
      type: "object",
      properties: {
        country: { type: "string", default: "" },
        countryCode: { type: "string", default: "" },
        region: { type: "string", default: "" },
        regionName: { type: "string", default: "" },
        city: { type: "string", default: "" },
        zip: { type: "string", default: "" },
        lat: { type: "number", default: 0 },
        lon: { type: "number", default: 0 },
        timezone: { type: "string", default: "" }
      }
    }
  }
};

const schemaCurrent = {
  description: ":city es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo actual.",
  params: {
    type: "object",
    properties: {
      city: { type: "string", enum: ["cordoba", "clodomira", "salta", "santiago del estero", "la banda"] }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        main: { default: {} },
        visibility: { type: "number" },
        weather: { type: "array", default: [] },
        wind: { default: {} }
      }
    }
  }
};

const schemaForecast = {
  description: ":city es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo a 5 días.",
  params: {
    type: "object",
    properties: {
      city: { type: "string", enum: ["cordoba", "clodomira", "salta", "santiago del estero", "la banda"] }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        list: { type: "array", default: [] }
      }
    }
  }
};

module.exports = async (fastify, opts) => {
  fastify.get("/v1/location", { schema: schemaLocation }, async (request, reply) => {
    try {
      const result = await fetch(`http://ip-api.com/json/${request.ip}`).then(res => res.json());
      reply.send(result);
    } catch (error) {
      request.log.info("Error: ", error);
      reply.code(500).send({ message: "Error en el servidor" });
    }
  });

  fastify.get("/v1/current/:city", { schema: schemaCurrent }, async (request, reply) => {
    try {
      const { city } = request.params;
      const cityResult = city || await fetch(`http://ip-api.com/json/${request.ip}`).then(res => res.json());
      const result1 = await fetch(`${URL_CURRENT}&&q=${cityResult}`);
      const data = await result1.json();
      reply.send(data);
    } catch (error) {
      request.log.info("Error: ", error);
      reply.code(500).send({ message: "Error en el servidor" });
    }
  });

  fastify.get("/v1/forecast/:city", { schema: schemaForecast }, async (request, reply) => {
    try {
      const { city } = request.params;
      const cityResult = city || await fetch(`http://ip-api.com/json/${request.ip}`).then(res => res.json());
      const result = await fetch(`${URL_FORECAST}&&q=${cityResult}`);
      const data = await result.json();
      reply.send(data);
    } catch (error) {
      request.log.info("Error: ", error);
      reply.code(500).send({ message: "Error en el servidor" });
    }
  });
};
