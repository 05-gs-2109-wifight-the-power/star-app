import { useHistory } from "react-router-dom";

function NotFound(props) {
	const history = useHistory();

	function goBack() {
		history.push("/");
	}

	return (
		<div style={{ margin: "5rem auto", width: "fit-content" }}>
			<h1>Page Not Found</h1>
			<h2>404</h2>
			<button onClick={goBack} style={{ padding: "5px 10px" }}>
				Go Back
			</button>
		</div>
	);
}

export default NotFound;
