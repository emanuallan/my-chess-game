const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// app.get("/", function (req, res) {
// 	res.send("<h1>Hello World </h1>");
// });

let currentPosition = [];
let turn = 1;
let blacksTakenPieces = [];
let whitesTakenPieces = [];

io.on("connection", function (socket) {
	console.log("a user connected");

	socket.on("new-position", function (position) {
		console.log("new move");
		currentPosition = position.position;
		turn = position.turn;
		blacksTakenPieces = position.blacksTakenPieces;
		whitesTakenPieces = position.whitesTakenPieces;

		io.emit("receive-new-position", { position: currentPosition, turn, blacksTakenPieces, whitesTakenPieces });
	});
});

io.on("connect_error", (err) => {
	console.log(`connect_error due to ${err.message}`);
});

http.listen(4000, function () {
	console.log("listening on *:4000");
});
