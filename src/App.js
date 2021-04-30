import React from "react";
import Board from "components/Board";

function App() {
	return (
		<div
			style={{
				backgroundColor: "gray",
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minWidth: "100%",
			}}
		>
			<Board />
		</div>
	);
}

export default App;
