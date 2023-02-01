import { render } from "@wordpress/element";
import { Button } from "@wordpress/components";
import { Providers } from "./context/Providers";

const CantoTheWordpress = () => {
	// console.log(Button);

	return (
		<Providers>
			<h1>General</h1>

			<Button isPrimary>Hi </Button>

			{/* <Button>Hello world</Button> */}
			{/* <Button variant="primary">Hi</Button> */}
		</Providers>
	);
};

document.addEventListener("DOMContentLoaded", function (event) {
	render(
		<CantoTheWordpress />,
		document.getElementById("canto-the-wordpress-settings-page")
	);
});
