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
	turn,
	setTurn,
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
			if (turn) {
				setTurn(0);
			} else {
				setTurn(1);
			}
		} else {
			const selectPiece = {
				...piece,
				x: coordinates.x,
				y: coordinates.y,
			};

			if (piece.player !== turn) {
				return;
			}

			setSelected(selectPiece);
			setHighlighted([]);

			switch (piece.piece) {
				case "pawn": {
					const legalMoves = [];

					if (piece.player) {
						const lPiece = getPiece(coordinates.x - 1, coordinates.y - 1);
						const rPiece = getPiece(coordinates.x + 1, coordinates.y - 1);

						if (lPiece && lPiece.player !== turn) {
							legalMoves.push({ x: coordinates.x - 1, y: coordinates.y - 1 });
						}
						if (rPiece && rPiece.player !== turn) {
							legalMoves.push({ x: coordinates.x + 1, y: coordinates.y - 1 });
						}
					} else {
						const lPiece = getPiece(coordinates.x - 1, coordinates.y + 1);
						const rPiece = getPiece(coordinates.x + 1, coordinates.y + 1);
						if (lPiece && lPiece.player !== turn) {
							legalMoves.push({ x: coordinates.x - 1, y: coordinates.y + 1 });
						}
						if (rPiece && rPiece.player !== turn) {
							legalMoves.push({ x: coordinates.x + 1, y: coordinates.y + 1 });
						}
					}

					if ((coordinates.y === 6 && piece.player === 1) || (coordinates.y === 1 && piece.player === 0)) {
						let possibleMoves;
						if (piece.player) {
							possibleMoves = [
								{ x: coordinates.x, y: coordinates.y - 1 },
								{ x: coordinates.x, y: coordinates.y - 2 },
							];
						} else {
							possibleMoves = [
								{ x: coordinates.x, y: coordinates.y + 1 },
								{ x: coordinates.x, y: coordinates.y + 2 },
							];
						}

						possibleMoves.every((move) => {
							if (!getPiece(move.x, move.y)) {
								legalMoves.push(move);
								return true;
							}
							return false;
						});
						setHighlighted(legalMoves);
					} else {
						if (piece.player === 1) {
							if (!getPiece(coordinates.x, coordinates.y - 1))
								legalMoves.push({ x: coordinates.x, y: coordinates.y - 1 });
						} else if (piece.player === 0) {
							if (!getPiece(coordinates.x, coordinates.y + 1))
								legalMoves.push({ x: coordinates.x, y: coordinates.y + 1 });
						}
						setHighlighted(legalMoves);
					}
					break;
				}
				case "knight":
					const legalMoves = [];

					if (coordinates.x + 1 < 8 && coordinates.y + 2 < 8) {
						const intersectingPiece = getPiece(coordinates.x + 1, coordinates.y + 2);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x + 1, y: coordinates.y + 2 });
						}
					}

					if (coordinates.x + 1 < 8 && coordinates.y - 2 >= 0) {
						const intersectingPiece = getPiece(coordinates.x + 1, coordinates.y - 2);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x + 1, y: coordinates.y - 2 });
						}
					}

					if (coordinates.x - 1 >= 0 && coordinates.y + 2 < 8) {
						const intersectingPiece = getPiece(coordinates.x - 1, coordinates.y + 2);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x - 1, y: coordinates.y + 2 });
						}
					}

					if (coordinates.x - 1 >= 0 && coordinates.y - 2 >= 0) {
						const intersectingPiece = getPiece(coordinates.x - 1, coordinates.y - 2);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x - 1, y: coordinates.y - 2 });
						}
					}

					if (coordinates.x + 2 < 8 && coordinates.y + 1 < 8) {
						const intersectingPiece = getPiece(coordinates.x + 2, coordinates.y + 1);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x + 2, y: coordinates.y + 1 });
						}
					}

					if (coordinates.x - 2 >= 0 && coordinates.y + 1 < 8) {
						const intersectingPiece = getPiece(coordinates.x - 2, coordinates.y + 1);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x - 2, y: coordinates.y + 1 });
						}
					}

					if (coordinates.x - 2 >= 0 && coordinates.y - 1 >= 0) {
						const intersectingPiece = getPiece(coordinates.x - 2, coordinates.y - 1);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x - 2, y: coordinates.y - 1 });
						}
					}

					if (coordinates.x + 2 < 8 && coordinates.y - 1 >= 0) {
						const intersectingPiece = getPiece(coordinates.x + 2, coordinates.y - 1);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x + 2, y: coordinates.y - 1 });
						}
					}

					setHighlighted(legalMoves);
					break;
				case "bishop": {
					const legalMoves = [];

					let i = 1;
					while (coordinates.x + i < 8 && coordinates.y + i < 8) {
						const intersectingPiece = getPiece(coordinates.x + i, coordinates.y + i);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x + i, y: coordinates.y + i });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					i = 1;
					while (coordinates.x + i < 8 && coordinates.y - i >= 0) {
						const intersectingPiece = getPiece(coordinates.x + i, coordinates.y - i);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x + i, y: coordinates.y - i });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					i = 1;
					while (coordinates.x - i >= 0 && coordinates.y + i < 8) {
						const intersectingPiece = getPiece(coordinates.x - i, coordinates.y + i);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x - i, y: coordinates.y + i });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					i = 1;
					while (coordinates.y - i >= 0 && coordinates.x - i >= 0) {
						const intersectingPiece = getPiece(coordinates.x - i, coordinates.y - i);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x - i, y: coordinates.y - i });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					setHighlighted(legalMoves);
					break;
				}
				case "rook": {
					const legalMoves = [];

					//right
					let i = 1;
					while (coordinates.x + i < 8) {
						const intersectingPiece = getPiece(coordinates.x + i, coordinates.y);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x + i, y: coordinates.y });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					//down
					i = 1;
					while (coordinates.y + i < 8) {
						const intersectingPiece = getPiece(coordinates.x, coordinates.y + i);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x, y: coordinates.y + i });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					//left
					i = 1;
					while (coordinates.x - i >= 0) {
						const intersectingPiece = getPiece(coordinates.x - i, coordinates.y);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x - i, y: coordinates.y });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					//up
					i = 1;
					while (coordinates.y - i >= 0) {
						const intersectingPiece = getPiece(coordinates.x, coordinates.y - i);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x, y: coordinates.y - i });
						if (intersectingPiece && intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					setHighlighted(legalMoves);

					break;
				}
				case "queen": {
					const legalMoves = [];

					//right
					let i = 1;
					while (coordinates.x + i < 8) {
						const intersectingPiece = getPiece(coordinates.x + i, coordinates.y);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x + i, y: coordinates.y });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					//down
					i = 1;
					while (coordinates.y + i < 8) {
						const intersectingPiece = getPiece(coordinates.x, coordinates.y + i);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x, y: coordinates.y + i });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					//left
					i = 1;
					while (coordinates.x - i >= 0) {
						const intersectingPiece = getPiece(coordinates.x - i, coordinates.y);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x - i, y: coordinates.y });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					//up
					i = 1;
					while (coordinates.y - i >= 0) {
						const intersectingPiece = getPiece(coordinates.x, coordinates.y - i);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x, y: coordinates.y - i });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					i = 1;
					while (coordinates.x + i < 8 && coordinates.y + i < 8) {
						const intersectingPiece = getPiece(coordinates.x + i, coordinates.y + i);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x + i, y: coordinates.y + i });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					i = 1;
					while (coordinates.x + i < 8 && coordinates.y - i >= 0) {
						const intersectingPiece = getPiece(coordinates.x + i, coordinates.y - i);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x + i, y: coordinates.y - i });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					i = 1;
					while (coordinates.x - i >= 0 && coordinates.y + i < 8) {
						const intersectingPiece = getPiece(coordinates.x - i, coordinates.y + i);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x - i, y: coordinates.y + i });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					i = 1;
					while (coordinates.y - i >= 0 && coordinates.x - i >= 0) {
						const intersectingPiece = getPiece(coordinates.x - i, coordinates.y - i);
						if (intersectingPiece?.player === turn) break;
						legalMoves.push({ x: coordinates.x - i, y: coordinates.y - i });
						if (intersectingPiece && intersectingPiece?.player !== turn) break;
						i++;
					}

					setHighlighted(legalMoves);
					break;
				}
				case "king": {
					const legalMoves = [];

					if (coordinates.x + 1 < 8) {
						const intersectingPiece = getPiece(coordinates.x + 1, coordinates.y);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x + 1, y: coordinates.y });
						}
					}

					if (coordinates.y + 1 < 8) {
						const intersectingPiece = getPiece(coordinates.x, coordinates.y + 1);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x, y: coordinates.y + 1 });
						}
					}

					if (coordinates.x - 1 >= 0) {
						const intersectingPiece = getPiece(coordinates.x - 1, coordinates.y);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x - 1, y: coordinates.y });
						}
					}

					if (coordinates.y - 1 >= 0) {
						const intersectingPiece = getPiece(coordinates.x, coordinates.y - 1);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x, y: coordinates.y - 1 });
						}
					}

					if (coordinates.x + 1 < 8 && coordinates.y + 1 < 8) {
						const intersectingPiece = getPiece(coordinates.x + 1, coordinates.y + 1);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x + 1, y: coordinates.y + 1 });
						}
					}

					if (coordinates.x - 1 >= 0 && coordinates.y + 1 < 8) {
						const intersectingPiece = getPiece(coordinates.x - 1, coordinates.y + 1);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x - 1, y: coordinates.y + 1 });
						}
					}

					if (coordinates.x - 1 >= 0 && coordinates.y - 1 >= 0) {
						const intersectingPiece = getPiece(coordinates.x - 1, coordinates.y - 1);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x - 1, y: coordinates.y - 1 });
						}
					}

					if (coordinates.x + 1 < 8 && coordinates.y - 1 >= 0) {
						const intersectingPiece = getPiece(coordinates.x + 1, coordinates.y - 1);
						if (!intersectingPiece || intersectingPiece?.player !== turn) {
							legalMoves.push({ x: coordinates.x + 1, y: coordinates.y - 1 });
						}
					}

					setHighlighted(legalMoves);

					break;
				}
				default:
					setSelected(null);
					setHighlighted([]);
			}
		}
	};

	console.log("render");

	return (
		<div
			onClick={handlePiece}
			style={{
				cursor: `${piece.player === turn || highlight ? "pointer" : "auto"}`,
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
