// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const express = require('express');

const server = express();
server.use(express.json());

const projectRouter = require('./projects/projects-router')
server.use('/api/projects', projectRouter);

server.get('/', (req, res)=> {
  res.send('its api time!')
})

module.exports = server;
