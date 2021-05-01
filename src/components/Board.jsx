import React, { useState, useEffect, useRef } from "react";
import Tile from "./Tile";
import io from "socket.io-client";

const socket = io("ws://localhost:4000", {
	transports: ["websocket", "polling"],
});
const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

function Board() {
	const [selected, setSelected] = useState(null);
	const [highlighted, setHighlighted] = useState([]);
	const [turn, setTurn] = useState(1);
	const [blacksTakenPieces, setBlacksTakenPieces] = useState([]);
	const [whitesTakenPieces, setWhitesTakenPieces] = useState([]);
	const [currentPosition, setCurrentPosition] = useState([
		[
			{ piece: "rook", player: 0 },
			{ piece: "pawn", player: 0 },
			"",
			"",
			"",
			"",
			{ piece: "pawn", player: 1 },
			{ piece: "rook", player: 1 },
		],
		[
			{ piece: "knight", player: 0 },
			{ piece: "pawn", player: 0 },
			"",
			"",
			"",
			"",
			{ piece: "pawn", player: 1 },
			{ piece: "knight", player: 1 },
		],
		[
			{ piece: "bishop", player: 0 },
			{ piece: "pawn", player: 0 },
			"",
			"",
			"",
			"",
			{ piece: "pawn", player: 1 },
			{ piece: "bishop", player: 1 },
		],
		[
			{ piece: "king", player: 0 },
			{ piece: "pawn", player: 0 },
			"",
			"",
			"",
			"",
			{ piece: "pawn", player: 1 },
			{ piece: "king", player: 1 },
		],
		[
			{ piece: "queen", player: 0 },
			{ piece: "pawn", player: 0 },
			"",
			"",
			"",
			"",
			{ piece: "pawn", player: 1 },
			{ piece: "queen", player: 1 },
		],
		[
			{ piece: "bishop", player: 0 },
			{ piece: "pawn", player: 0 },
			"",
			"",
			"",
			"",
			{ piece: "pawn", player: 1 },
			{ piece: "bishop", player: 1 },
		],
		[
			{ piece: "knight", player: 0 },
			{ piece: "pawn", player: 0 },
			"",
			"",
			"",
			"",
			{ piece: "pawn", player: 1 },
			{ piece: "knight", player: 1 },
		],
		[
			{ piece: "rook", player: 0 },
			{ piece: "pawn", player: 0 },
			"",
			"",
			"",
			"",
			{ piece: "pawn", player: 1 },
			{ piece: "rook", player: 1 },
		],
	]);

	useEffect(() => {
		socket.on("connect", () => {
			socket.emit("new-position", { position: currentPosition, turn, blacksTakenPieces, whitesTakenPieces });
		});

		socket.on("receive-new-position", (newPosition) => {
			setCurrentPosition(newPosition.position);
			setTurn(newPosition.turn);
			setWhitesTakenPieces(newPosition.whitesTakenPieces);
			setBlacksTakenPieces(newPosition.blacksTakenPieces);
		});
	}, []);

	const getPiece = (rIndex, cIndex) => {
		if (rIndex > 7 || cIndex > 7 || rIndex < 0 || cIndex < 0) {
			return false;
		}
		return currentPosition[rIndex][cIndex];
	};

	const setPiece = (rIndex, cIndex, piece) => {
		const takenPiece = getPiece(rIndex, cIndex);

		if (takenPiece) {
			if (turn) {
				blacksTakenPieces.push(takenPiece);
				setBlacksTakenPieces([...blacksTakenPieces]);
			} else {
				whitesTakenPieces.push(takenPiece);
				setWhitesTakenPieces([...whitesTakenPieces]);
			}
		}
		currentPosition[rIndex][cIndex] = piece;
		const newPosition = JSON.parse(JSON.stringify(currentPosition));
		setCurrentPosition(newPosition);
		let newTurn = turn ? 0 : 1;

		socket.emit("new-position", { position: newPosition, turn: newTurn, blacksTakenPieces, whitesTakenPieces });
	};

	const removePiece = (rIndex, cIndex) => {
		currentPosition[rIndex][cIndex] = "";
		const newPosition = JSON.parse(JSON.stringify(currentPosition));
		setCurrentPosition(newPosition);
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexWrap: "wrap-reverse",
					maxWidth: 800,
				}}
			>
				<div style={{ display: "flex", marginBottom: 8, height: 60 }}>
					{whitesTakenPieces.map((piece, index) => (
						<img
							key={index}
							src={`/pieces/${piece.player ? `light-${piece.piece}.png` : `${piece.piece}.png`}`}
							height="55px"
							width="55px"
						/>
					))}
				</div>
				<div
					style={{
						fontSize: "24px",
						fontWeight: "bold",
						color: `${turn ? "#FFF" : "#000"}`,
						marginBottom: "0.5em",
						display: "flex",
						alignItems: "center",
					}}
				>
					<img
						src={`/pieces/${turn ? `light-king.png` : `king.png`}`}
						height="40px"
						width="40px"
						style={{ marginRight: "8px" }}
					/>
					{turn ? "White's" : "Black's"} turn
				</div>
			</div>
			<div
				style={{ height: "800px", width: "800px", backgroundColor: "black", display: "flex", flexWrap: "wrap" }}
			>
				{columns.map((c, cIndex) =>
					rows.map((r, rIndex) => {
						const index = cIndex + rIndex;
						return (
							<Tile
								highlighted={highlighted}
								setHighlighted={setHighlighted}
								getPiece={getPiece}
								setPiece={setPiece}
								selected={selected}
								setSelected={setSelected}
								removePiece={removePiece}
								key={c + r + currentPosition[rIndex][cIndex].piece}
								turn={turn}
								setTurn={setTurn}
								chessCoordinates={c + r}
								coordinates={{ x: rIndex, y: cIndex }}
								light={index % 2 === 0}
								piece={currentPosition[rIndex][cIndex]}
							/>
						);
					})
				)}
			</div>
			<div style={{ display: "flex", marginTop: 8, height: 60 }}>
				{blacksTakenPieces.map((piece, index) => (
					<img
						key={index}
						src={`/pieces/${piece.player ? `light-${piece.piece}.png` : `${piece.piece}.png`}`}
						height="55px"
						width="55px"
					/>
				))}
			</div>
		</div>
	);
}

export default Board;
