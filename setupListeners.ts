import { Server } from "socket.io";
import { Game } from "./classes/game";

export const rooms = new Map<string, Game>();

export function setupListeners(io: Server) {
  io.on("connection", (socket) => {
    console.log(`New connection - ${socket.id}`);

    socket.on("join-game", (roomId: string, name: string) => {
      console.log(roomId,name);
      if (!roomId) {
        return socket.emit("error", "Invalid room ID");
      }
      socket.join(roomId);
      console.log("joined a room");

      if (rooms.has(roomId)) {
        console.log("room exists");
        socket.emit("verified",roomId)
        const game = rooms.get(roomId);
        if (!game) return socket.emit("error", "Game not found");
        game.joinPlayer(socket.id, name, socket);
      } else {
        socket.emit('invalid');
        console.log("room doesnt exists");
        const game = new Game(roomId, io, socket.id);
        rooms.set(roomId, game);
        game.joinPlayer(socket.id, name, socket);
      }
    });
  });
}
