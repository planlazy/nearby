const hapi = require('hapi');
const inert = require('inert');

const { addRoutes } = require('./routes');

const plugins = [inert];

let server;

// Start the server
async function start({ showOutput }) {
  server = hapi.server({
    port: 8181,
  });

  try {
    await server.register(plugins);
    addRoutes(server, { showOutput });
    await server.start();
  } catch (err) {
    if (showOutput) {
      console.log(err);
    }
    process.exit(1);
  }

  if (showOutput) {
    console.log('Server running at:', server.info.uri);
  }
}

async function stop() {
  await server.stop();
  server = null;
}

module.exports = {
  start,
  stop,
};
