const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// app.get("/", function (req, res) {
// 	res.send("<h1>Hello World </h1>");
// });

let currentPosition = [];
let turn = 1;
io.on("connection", function (socket) {
	console.log("a user connected");

	socket.on("new-move", function (position) {
		console.log("new move");
		currentPosition = position.position;
		turn = position.turn;

		io.emit("receive-new-move", { position: currentPosition, turn: turn });
	});
});

io.on("connect_error", (err) => {
	console.log(`connect_error due to ${err.message}`);
});

http.listen(4000, function () {
	console.log("listening on *:4000");
});
