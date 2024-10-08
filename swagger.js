const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Game Credentials API",
    description: "Game Credentials API",
  },
  host: "localhost:3000",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
