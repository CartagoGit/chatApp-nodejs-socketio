import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.Server(app);
//Crea la conexion del socket con el servidor
const io = new Server(server);

const PORT = 6677;
const URL = "http://localhost";

//Cargar el html de aqui
app.use(express.static("client"));

app.get("/test", (req, res) => {
	res.status(200).send("Hola mundo desde una ruta, para testear que funciona");
});

//Como no estamos usando una base de datos vamos a usar un json de ejemplo
let messages = [
	{
		id: 1,
		text: "Bienvenido al chat privado de Socket.io y NodeJs de Cartago",
		nickname: "Bot - CartagoAutomatic",
	},
];

//Comprobar cuando un usuario se conecta y mostrar su IP
io.on("connection", (socket) => {
	console.log(
		"El nodo/cliente con IP" + socket.handshake.address + " se ha conectado"
	);
	socket.emit("messages", messages);

	//Cuando reciba un evento
	socket.on("add-message", (data) => {
        
		messages.push(data);
		io.sockets.emit("messages", messages);
	});
});

server.listen(PORT, () => {
	console.log("Servidor funcionando en " + URL + ":" + PORT);
});
