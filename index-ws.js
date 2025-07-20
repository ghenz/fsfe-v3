import { WebSocketServer } from "ws";
import { createServer } from "http";
import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer();
const app = express();

server.on('request', app);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const wss = new WebSocketServer({ server });


wss.on("connection", (ws) => {
  const numClients = wss.clients.size;
  console.log(`${numClients} clients connected`);

  wss.broadcast(`${numClients} clients connected`);

  if(ws.readyState === WebSocket.OPEN) {
    ws.send("Hello from server");
  }
  
  ws.on("close", () => {
    wss.broadcast(`${wss.clients.size} clients connected`);
    console.log("Client disconnected");
  });
  
});

wss.on("error", (error) => {
  console.error("WebSocket error:", error);
});

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
      client.send(data);
  });
};


