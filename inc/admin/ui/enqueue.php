<?php
defined( 'ABSPATH' ) || die( 'Cheatin&#8217; uh?' );

/**
 * Add the CSS and JS files for WP Rocket options page
 *
 * @since 1.0.0
 */
function rocket_add_admin_css_js() {
	wp_enqueue_script( 'jquery-ui-sortable', null, array( 'jquery', 'jquery-ui-core' ), null, true );
	wp_enqueue_script( 'jquery-ui-draggable', null, array( 'jquery', 'jquery-ui-core' ), null, true );
	wp_enqueue_script( 'jquery-ui-droppable', null, array( 'jquery', 'jquery-ui-core' ), null, true );
	wp_enqueue_script( 'options-wp-rocket', WP_ROCKET_ADMIN_UI_JS_URL . 'options.js', array( 'jquery', 'jquery-ui-core' ), WP_ROCKET_VERSION, true );
	wp_enqueue_script( 'fancybox-wp-rocket', WP_ROCKET_ADMIN_UI_JS_URL . 'vendors/jquery.fancybox.pack.js', array( 'options-wp-rocket' ), WP_ROCKET_VERSION, true );
	wp_enqueue_script( 'sweet-alert-wp-rocket', WP_ROCKET_ADMIN_UI_JS_URL . 'vendors/sweetalert2.min.js', array( 'options-wp-rocket' ), WP_ROCKET_VERSION, true );

	wp_enqueue_style( 'options-wp-rocket', WP_ROCKET_ADMIN_UI_CSS_URL . 'options.css', array(), WP_ROCKET_VERSION );
	wp_enqueue_style( 'fancybox-wp-rocket', WP_ROCKET_ADMIN_UI_CSS_URL . 'fancybox/jquery.fancybox.css', array( 'options-wp-rocket' ), WP_ROCKET_VERSION );

	$minify_text = rocket_is_white_label() ? __( 'If there are any display errors we recommend to disable the option.', 'rocket' ) : __( 'If there are any display errors we recommend following our documentation: ', 'rocket' ) . ' <a href="http://docs.wp-rocket.me/article/19-resolving-issues-with-file-optimization?utm_source=wp-rocket&utm_medium=wp-admin&utm_term=doc-minification&utm_campaign=plugin">Resolving issues with file optimization</a>.<br/><br/>' . sprintf( __( 'You can also <a href="%s">contact our support</a> if you need help with this feature.', 'rocket' ), 'http://wp-rocket.me/support/?utm_source=wp-rocket&utm_medium=wp-admin&utm_term=support-minification&utm_campaign=plugin' );

	// Sweet Alert.
	$translation_array = array(
		'warningTitle'     => __( 'Are you sure?', 'rocket' ),

		'cloudflareTitle'  => __( 'Cloudflare Settings', 'rocket' ),
		'cloudflareText'   => __( 'Click "Save Changes" to activate the Cloudflare tab.', 'rocket' ),

		'minifyText' => $minify_text,

		'confirmButtonText' => __( 'Yes, I\'m sure!', 'rocket' ),
		'cancelButtonText'  => __( 'Cancel', 'rocket' ),
	);
	wp_localize_script( 'options-wp-rocket', 'sawpr', $translation_array );
	wp_enqueue_style( 'sweet-alert-wp-rocket', WP_ROCKET_ADMIN_UI_CSS_URL . 'sweetalert2.min.css', array( 'options-wp-rocket' ), WP_ROCKET_VERSION );
}
add_action( 'admin_print_styles-settings_page_' . WP_ROCKET_PLUGIN_SLUG, 'rocket_add_admin_css_js' );

/**
 * Add the CSS and JS files needed by WP Rocket everywhere on admin pages
 *
 * @since 2.1
 */
function rocket_add_admin_css_js_everywhere() {
	wp_enqueue_script( 'all-wp-rocket', WP_ROCKET_ADMIN_UI_JS_URL . 'all.js', array( 'jquery' ), WP_ROCKET_VERSION, true );
}
add_action( 'admin_print_styles', 'rocket_add_admin_css_js_everywhere', 11 );

/**
 * Add some CSS to display the dismiss cross
 *
 * @since 1.1.10
 */
function rocket_admin_print_styles() {
	wp_enqueue_style( 'admin-wp-rocket', WP_ROCKET_ADMIN_UI_CSS_URL . 'admin.css', array(), WP_ROCKET_VERSION );
}
add_action( 'admin_print_styles', 'rocket_admin_print_styles' );

/**
 * Add CSS & JS files for the Imagify installation call to action
 *
 * @since 2.7
 */
function rocket_enqueue_modal_plugin() {
	wp_enqueue_style( 'plugin-install' );

    wp_enqueue_script( 'plugin-install' );
    wp_enqueue_script( 'updates' );
    add_thickbox();
}
add_action( 'admin_print_styles-media-new.php', 'rocket_enqueue_modal_plugin' );
add_action( 'admin_print_styles-upload.php', 'rocket_enqueue_modal_plugin' );
add_action( 'admin_print_styles-settings_page_' . WP_ROCKET_PLUGIN_SLUG, 'rocket_enqueue_modal_plugin' );
