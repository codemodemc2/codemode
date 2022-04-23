const express = require("express");
const { getFiles } = require("@/helpers/tools.js");

module.exports = async (app) => {
  const routes = getFiles("routes");
  try {
    routes.forEach((r) => {
      const file = r.substring(7);
      if (file === "index.js") return;
      const router = express.Router();
      const routeModule = require(require("path").join(__dirname, file));
      const temp = file.split("/");
      const path = "/" + temp.slice(0, temp.length - 1).join("/");
      const route = routeModule.config
        ? routeModule.config(router)
        : routeModule(router);
      app.use(path, route);
    });
    console.log("ALL ROUTES REGISTERED");
  } catch (error) {
    console.log("ROUTES FAILED TO REGISTER");
    console.log(error);
  }
};
