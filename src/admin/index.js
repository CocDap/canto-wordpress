import { render, createRoot } from "@wordpress/element";
import { Button } from "@wordpress/components";
import { Providers } from "./context/Providers";

const CantoTheWordpress = () => {
	// console.log(Button);

	return (
		<Providers>
			<h1>General</h1>

			<Button variant="secondary">Hi </Button>

			{/* <Button>Hello world</Button> */}
			{/* <Button variant="primary">Hi</Button> */}
		</Providers>
	);
};

document.addEventListener("DOMContentLoaded", function (event) {

	createRoot(
		document.getElementById("canto-the-wordpress-settings-page")
	).render(<CantoTheWordpress />);
});
