import { render } from '@wordpress/element';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

class CantoTheWordpress extends Component {
    render() {
        return (
            <h1>General Settings</h1>
        );
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    render(
        <CantoTheWordpress />,
        document.getElementById('canto-the-wordpress-settings-page')
    );
});