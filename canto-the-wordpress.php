<?php
/**
 * Plugin Name:       Canto The Wordpress
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       canto-the-wordpress
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_canto_the_wordpress_block_init()
{
	register_block_type(__DIR__ . '/build/block-payment');
	wp_enqueue_script('canto-the-wordpress-view-js', plugins_url('build/block-payment/view.js', __FILE__), array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), '1.0', true);
}
function prefix_enqueue_scripts()
{
	if (get_current_screen()->id != 'toplevel_page_canto-payment') {
		return;
	}
	wp_enqueue_script('canto-the-wordpress-settings-js', plugins_url('build/admin/index.js', __FILE__), array('wp-element', 'wp-i18n', 'wp-components'), '1.0', false);
}
function prefix_register_settings_menu()
{
	add_menu_page('Plugin Settings', 'Canto The Wordpress', 'manage_options', 'canto-payment', 'plugin_settings_page', 'dashicons-admin-generic', 99);
}
function plugin_settings_page()
{
	?>
	<div id="canto-the-wordpress-settings-page"></div>
<?php
}

add_action('init', 'create_block_canto_the_wordpress_block_init');

// check if is admin
if (is_admin()) {
	// add admin menu
	add_action('admin_menu', 'prefix_register_settings_menu');
	// add admin scripts
	add_action('admin_enqueue_scripts', 'prefix_enqueue_scripts');
}