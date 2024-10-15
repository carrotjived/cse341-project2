const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Game Credentials API",
    description: "Game Credentials API",
  },
  host: "https://cse341-project2-68l5.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
