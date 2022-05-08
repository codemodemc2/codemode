module.exports = (app) => {
  app.use((req, res, next) => {
    let response = {
      message: "That route does not exist on this server",
      route: req.path,
      success: false,
    };
    res.status(404).send(JSON.stringify(response));
    next();
  });

  app.use((err, req, res, next) => {
    console.log(err);
    res
      .status(err.status)
      .send(
        JSON.stringify({ message: err.message, success: false }) ||
          JSON.stringify({ message: "Unknown error", success: false })
      );
    next();
  });
};
