import React from "react";
import "./App.css";
import Board from "components/Board";

function App() {
	return (
		<div
			style={{
				backgroundColor: "gray",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Board />
		</div>
	);
}

export default App;
