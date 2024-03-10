import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import { setupListeners } from './setupListeners';

const PORT = process.env.PORT || 8080;

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

setupListeners(io);

app.get('/', (req, res) => {
  res.send('Hello, this is the Express server!');
});

httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
