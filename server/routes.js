function addRoutes(server) {
  server.route({
    method: 'GET',
    path: '/',
    handler: () => 'hello world',
  });

  server.route({
    method: 'GET',
    path: '/health',
    handler: () => ({ status: 'GOOD' }),
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public',
      },
    },
  });
}

module.exports = {
  addRoutes,
};
