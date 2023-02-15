<?php

/**
 * Plugin Name:       Canto Sub
 * Description:       Payment extension for Canto Blockchain
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
}
function prefix_enqueue_scripts()
{
	if (get_current_screen()->id != 'toplevel_page_canto-payment') {
		return;
	}
	wp_enqueue_script('canto-the-wordpress-settings-js', plugins_url('build/admin/admin.js', __FILE__), array('wp-element', 'wp-i18n', 'wp-components'), '1.0', false);
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


/*
META BOX
*/
function wporg_add_custom_box()
{
	$screens = ['post', 'wporg_cpt'];
	foreach ($screens as $screen) {
		add_meta_box(
			'wporg_box_id',
			// Unique ID
			'Canto Sub',
			// Box title
			'wporg_custom_box_html',
			// Content callback, must be of type callable
			$screen,
			//  Post type
			'side'
		);
	}
}
add_action('add_meta_boxes', 'wporg_add_custom_box');

function wporg_custom_box_html($post)
{
	$nft_address = get_post_meta($post->ID, '_wporg_nft_address', true);
	$nft_id = get_post_meta($post->ID, '_wporg_nft_id', true);
	$payment_type = get_post_meta($post->ID, '_wporg_payment_type', true);
	$price = get_post_meta($post->ID, '_wporg_price', true);
	$wallet_address = get_post_meta($post->ID, '_wporg_wallet_address', true);

?>


	<div style="display:grid;grid-gap:10px">
		<div>
			<p>
				Add Canto Sub donate button to active this post for paid or nft required.
			</p>
		</div>
		<div>
			<!-- nft address -->
			<div style="margin-bottom:4px">
				<label for="payment_type">
					Payment type
				</label>
			</div>
			<div>
				<select name="payment_type" id="payment_type" onchange="if (this.value == 'paid') { document.getElementById('paid').style.display = 'block'; document.getElementById('nft').style.display = 'none'; } else if (this.value == 'nft') { document.getElementById('paid').style.display = 'none'; document.getElementById('nft').style.display = 'block'; } else { document.getElementById('paid').style.display = 'none'; document.getElementById('nft').style.display = 'none'; }">
					<option value="free" <?php echo $payment_type == 'free' ? 'selected' : '' ?>>Free</option>
					<option value="paid" <?php echo $payment_type == 'paid' ? 'selected' : '' ?>>Paid</option>
					<option value="nft" <?php echo $payment_type == 'nft' ? 'selected' : '' ?>>NFT Required</option>
				</select>
			</div>
		</div>

		<script>
			window.addEventListener('load', function() {
				if (document.getElementById('payment_type').value == 'paid') {
					document.getElementById('paid').style.display = 'block';
					document.getElementById('nft').style.display = 'none';
				} else if (document.getElementById('payment_type').value == 'nft') {
					document.getElementById('paid').style.display = 'none';
					document.getElementById('nft').style.display = 'block';
				} else {
					document.getElementById('paid').style.display = 'none';
					document.getElementById('nft').style.display = 'none';
				}
			});
		</script>

		<!-- switch -->
		<?
		if ($payment_type == 'paid') {
		?>
			<div id="paid">
				<figure>
					<!-- nft address -->
					<div style="margin-bottom:4px">
						<label for="price">
							Price
						</label>
					</div>
					<div style="display:flex;align-items:center;gap:10px">
						<input type="text" id="price" name="price" value="<?php echo esc_attr($price); ?>" />


					</div>
				</figure>


				<div style="margin-top:20px"></div>

				<!-- For react render -->
				<div id="register_post_with_smart_contract"></div>
			</div>
		<?
		} else if ($payment_type == 'nft') {
		?>
			<div id="nft">
				<div>
					<!-- nft address -->
					<div style="margin-bottom:4px">
						<label for="nft_address">NFT Address</label>
					</div>
					<div>
						<input type="text" id="nft_address" name="nft_address" value="<?php echo esc_attr($nft_address); ?>" />
					</div>
				</div>

			</div>
		<?
		}
		?>

	</div>
<?php
}

function wporg_save_postdata($post_id)
{
	update_post_meta(
		$post_id,
		'_wporg_nft_address',
		$_POST['nft_address']
	);

	update_post_meta(
		$post_id,
		'_wporg_payment_type',
		$_POST['payment_type']
	);

	update_post_meta(
		$post_id,
		'_wporg_price',
		$_POST['price']
	);

	update_post_meta(
		$post_id,
		'_wporg_wallet_address',
		$_POST['wallet_address']
	);
}
add_action('save_post', 'wporg_save_postdata');

// change post content by meta value
add_filter('the_content', 'filter_the_content_canto', 1);

function filter_the_content_canto($content)
{

	global $post;

	$meta = get_post_meta($post->ID, '_wporg_payment_type', true);

	switch ($meta) {
		case "free":
			return $content;

		case "nft":
			return '<div id="nft-required" data-nft-address="' . get_post_meta($post->ID, '_wporg_nft_address', true) . '">' . $content . '</div>';

		case "paid":
			$my_post = array();
			$my_post['post_content'] = '<div id="paid-required" data-wallet-address="' . get_post_meta($post->ID, '_wporg_wallet_address', true) . '" data-price="' . get_post_meta($post->ID, '_wporg_price', true) . '">' . $post->post_content . '</div>';

			return $my_post['post_content'];
		default:
			return $content;
	}

	return $content;
}
?>