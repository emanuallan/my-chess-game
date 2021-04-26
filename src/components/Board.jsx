import React, { useState, useEffect } from "react";
import Tile from "./Tile";

const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

function Board() {
	const [selected, setSelected] = useState(null);
	const [highlighted, setHighlighted] = useState([]);
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

	const getPiece = (rIndex, cIndex) => {
		return currentPosition[rIndex][cIndex];
	};

	const setPiece = (rIndex, cIndex, piece) => {
		currentPosition[rIndex][cIndex] = piece;
		const newPosition = JSON.parse(JSON.stringify(currentPosition));
		setCurrentPosition(newPosition);
	};

	const removePiece = (rIndex, cIndex) => {
		currentPosition[rIndex][cIndex] = "";
		const newPosition = JSON.parse(JSON.stringify(currentPosition));
		setCurrentPosition(newPosition);
	};

	return (
		<div style={{ height: "800px", width: "800px", backgroundColor: "black", display: "flex", flexWrap: "wrap" }}>
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
							key={index}
							chessCoordinates={c + r}
							coordinates={{ x: rIndex, y: cIndex }}
							light={index % 2 === 0}
							piece={currentPosition[rIndex][cIndex]}
						/>
					);
				})
			)}
		</div>
	);
}

export default Board;
