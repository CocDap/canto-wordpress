import { render } from "@wordpress/element";
import { Providers } from "./context/Providers";
// import "./styles.scss";

const CantoTheWordpress = () => {
	return (
		<Providers>
			<h1>General</h1>
			<p>Hi there</p>

			{/* label */}
			<form className="canto-the-wordpress-settings-page">
				<div>
					<label htmlFor="canto-the-wordpress-settings-page">Address</label>
					<input type="text" />
				</div>
			</form>
		</Providers>
	);
};

document.addEventListener("DOMContentLoaded", function (event) {
	try {
		const rootElement = document.getElementById(
			"canto-the-wordpress-settings-page"
		);
		render(<CantoTheWordpress />, rootElement);
	} catch (error) {
		console.log(error);
	}
});
