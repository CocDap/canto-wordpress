import { render } from '@wordpress/element'
import { App } from './app/app';

window.addEventListener("load", function () {
    console.log("hi there");

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
});
