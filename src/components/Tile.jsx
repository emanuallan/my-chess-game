import React, { useState, useMemo } from "react";

const Tile = ({
	light,
	highlighted,
	setHighlighted,
	selected,
	setSelected,
	coordinates,
	piece,
	getPiece,
	removePiece,
	setPiece,
	chessCoordinates,
}) => {
	const highlight = useMemo(() => {
		for (let i = 0; i < highlighted.length; i++) {
			if (highlighted[i].x === coordinates.x && highlighted[i].y === coordinates.y) return true;
		}

		return false;
	}, [highlighted, coordinates]);

	const samePiece = useMemo(() => {
		if (!selected || !piece) return false;

		return (
			selected.piece === piece.piece &&
			selected.player === piece.player &&
			selected.x === coordinates.x &&
			selected.y === coordinates.y
		);
	}, [selected, piece, coordinates]);

	const handlePiece = () => {
		if (highlight) {
			removePiece(selected.x, selected.y);
			setPiece(coordinates.x, coordinates.y, { piece: selected.piece, player: selected.player });
			setHighlighted([]);
			setSelected(null);
		} else {
			const selectPiece = {
				...piece,
				x: coordinates.x,
				y: coordinates.y,
			};

			setSelected(selectPiece);
			setHighlighted([]);
			switch (piece.piece) {
				case "pawn":
					if ((coordinates.y === 6 && piece.player === 1) || (coordinates.y === 1 && piece.player === 0)) {
						if (piece.player) {
							const possibleMoves = [
								{ x: coordinates.x, y: coordinates.y - 1 },
								{ x: coordinates.x, y: coordinates.y - 2 },
							];
							const legalMoves = [];
							possibleMoves.forEach((move) => {
								if (!getPiece(move.x, move.y)) {
									legalMoves.push(move);
								}
							});
							setHighlighted(legalMoves);
						} else {
							const possibleMoves = [
								{ x: coordinates.x, y: coordinates.y + 1 },
								{ x: coordinates.x, y: coordinates.y + 2 },
							];
							const legalMoves = [];
							possibleMoves.forEach((move) => {
								if (!getPiece(move.x, move.y)) {
									legalMoves.push(move);
								}
							});
							setHighlighted(legalMoves);
						}
					} else {
						if (piece.player === 1) {
							if (!getPiece(coordinates.x, coordinates.y - 1))
								setHighlighted([{ x: coordinates.x, y: coordinates.y - 1 }]);
						} else if (piece.player === 0) {
							if (!getPiece(coordinates.x, coordinates.y + 1))
								setHighlighted([{ x: coordinates.x, y: coordinates.y + 1 }]);
						}
					}
					break;
				case "knight":
					console.log("knight");
					break;
				case "bishop":
					const possibleMoves = [];

					let i = 1;
					while (
						coordinates.x + i < 8 &&
						coordinates.y + i < 8 &&
						!getPiece(coordinates.x + i, coordinates.y + i)
					) {
						possibleMoves.push({ x: coordinates.x + i, y: coordinates.y + i });
						i++;
					}

					let j = 1;
					while (
						coordinates.x + j < 8 &&
						coordinates.y - j >= 0 &&
						!getPiece(coordinates.x + j, coordinates.y - j)
					) {
						possibleMoves.push({ x: coordinates.x + j, y: coordinates.y - j });
						j++;
					}

					let l = 1;
					while (
						coordinates.x - l >= 0 &&
						coordinates.y + l < 8 &&
						!getPiece(coordinates.x - l, coordinates.y + l)
					) {
						possibleMoves.push({ x: coordinates.x - l, y: coordinates.y + l });
						l++;
					}

					let k = 1;
					while (
						coordinates.y - k >= 0 &&
						coordinates.x - k >= 0 &&
						!getPiece(coordinates.x - k, coordinates.y - k)
					) {
						possibleMoves.push({ x: coordinates.x - k, y: coordinates.y - k });
						k++;
					}

					setHighlighted(possibleMoves);
					break;
				case "rook":
					const legalMoves = [];

					//right
					let i2 = 1;
					while (coordinates.x + i2 < 8) {
						const intersectingPiece = getPiece(coordinates.x + i2, coordinates.y);
						if (intersectingPiece?.player === 1) break;
						legalMoves.push({ x: coordinates.x + i2, y: coordinates.y });
						if (intersectingPiece?.player === 0) break;
						i2++;
					}

					//down
					i2 = 1;
					while (coordinates.y + i2 < 8) {
						const intersectingPiece = getPiece(coordinates.x, coordinates.y + i2);
						if (intersectingPiece?.player === 1) break;
						legalMoves.push({ x: coordinates.x, y: coordinates.y + i2 });
						if (intersectingPiece?.player === 0) break;
						i2++;
					}

					//left
					i2 = 1;
					while (coordinates.x - i2 >= 0) {
						const intersectingPiece = getPiece(coordinates.x - i2, coordinates.y);
						if (intersectingPiece?.player === 1) break;
						legalMoves.push({ x: coordinates.x - i2, y: coordinates.y });
						if (intersectingPiece?.player === 0) break;
						i2++;
					}

					//up
					i2 = 1;
					while (coordinates.y - i2 >= 0) {
						const intersectingPiece = getPiece(coordinates.x, coordinates.y - i2);
						if (intersectingPiece?.player === 1) break;
						legalMoves.push({ x: coordinates.x, y: coordinates.y - i2 });
						if (intersectingPiece?.player === 0) break;
						i2++;
					}

					setHighlighted(legalMoves);

					break;
				case "queen":
					console.log("queen");
					break;
				case "king":
					console.log("king");
					break;
				default:
					setSelected(null);
					setHighlighted([]);
			}
		}
	};

	return (
		<div
			onClick={handlePiece}
			style={{
				height: `${samePiece || highlight ? "94px" : "100px"}`,
				width: `${samePiece || highlight ? "94px" : "100px"}`,
				backgroundColor: `${light ? "#DCBB6C" : "#B28748"}`,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				border: `${samePiece ? `3px solid green` : `${highlight ? "3px solid yellow" : ""}`}`,
			}}
		>
			{/* {coordinate} */}
			{piece && (
				<img
					src={`/pieces/${piece.player ? `light-${piece.piece}.png` : `${piece.piece}.png`}`}
					height="79px"
					width="79px"
				/>
			)}
		</div>
	);
};

export default Tile;
