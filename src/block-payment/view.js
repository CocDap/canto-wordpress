import { render } from "@wordpress/element";
import { App } from "./app/app";
import { App as RegisterNFTApp } from "./register-nft/app";

window.addEventListener("load", function () {
	console.log("hi there");

	try {
		//wp-block-create-block-canto-the-wordpress
		const block = document.querySelector(
			".wp-block-create-block-canto-the-wordpress"
		);

		// render react component right after
		const div = document.createElement("div");
		div.id = "root";
		block.appendChild(div);

		// render react component
		render(<App />, div);
	} catch (e) {
		console.log("error", e);
	}

	//  Load register nft
	{
		// #register_post_with_smart_contract
		const element = document.getElementById(
			"register_post_with_smart_contract"
		);

		if (element) {
			const div = document.createElement("div");
			div.id = "root";
			element.appendChild(div);

			// render react component
			render(<RegisterNFTApp />, div);
		}
	}
});
