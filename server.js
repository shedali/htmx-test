'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const start = async () => {

    const server = Hapi.server({
        port: 4000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/index.html',
        handler: function (request, h) {
            return h.file('index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/hello/{user}',
        handler: function (request, h) {
            return `Hello ${request.params.user}!`;
        }
    });


    server.route({
        method: 'GET',
        path: '/news',
        handler: async function (request, h) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
            return `<div id="news" class="blue">${Math.random() * 1000}</div>`;
        }
    });

    await server.start();
    console.log('Server running at:', server.info.uri);
};

start();