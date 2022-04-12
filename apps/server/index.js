require('dotenv').config();

const moduleAlias = require('module-alias')
moduleAlias.addAlias('@', __dirname + '/src/')
moduleAlias.addAlias('@config', __dirname + '/src/config/')

moduleAlias()

const { createServer } = require("@/server.js");

const port = process.env.PORT || 8080;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
