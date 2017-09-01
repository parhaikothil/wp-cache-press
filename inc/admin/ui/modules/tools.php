<?php
defined( 'ABSPATH' ) || die( 'Cheatin&#8217; uh?' );

add_settings_section( 'rocket_display_tools', __( 'Tools', 'rocket' ), '__return_false', 'rocket_tools' );

/**
 * Clear cache
 */
add_settings_field(
	'rocket_purge_all',
	__( 'Clear cache:', 'rocket' ),
	'rocket_button',
	'rocket_tools',
	'rocket_display_tools',
	array(
		'helper_help' => array(
			'name'         => 'purge_all',
			'description'  => __( 'Clear the cache for the whole website.', 'rocket' ),
		),
		'button' => array(
			'button_label' => __( 'Clear cache', 'rocket' ),
			'url'		   => wp_nonce_url( admin_url( 'admin-post.php?action=purge_cache&type=all' ), 'purge_cache_all' ),
		),
	)
);

/**
 * Preload
 */
add_settings_field(
	'rocket_preload',
	__( 'Preload cache:', 'rocket' ),
	'rocket_button',
	'rocket_tools',
	'rocket_display_tools',
	array(
		'helper_help' => array(
			'name'         => 'preload',
			'description'  => sprintf(
				/* translators: %s = tab anchor */
				__( 'Preload the cache according to your <a href="%s">Preload settings</a>.', 'rocket' ),
				'#tab_preload'
			)
		),
		'button' => array(
			'button_label' => __( 'Preload cache', 'rocket' ),
			'url'		   => wp_nonce_url( admin_url( 'admin-post.php?action=preload' ), 'preload' ),
		),
	)
);

/**
 * Clear OPcache
 */
if ( function_exists( 'opcache_reset' ) ) {

	add_settings_field(
		'rocket_purge_opcache',
		__( 'Purge OPcache:', 'rocket' ),
		'rocket_button',
		'rocket_tools',
		'rocket_display_tools',
		array(
			'button' => array(
				'button_label' => __( 'Purge OPcache', 'rocket' ),
				'url'		   => wp_nonce_url( admin_url( 'admin-post.php?action=rocket_purge_opcache' ), 'rocket_purge_opcache' ),
			),
		)
	);
}

/**
 * Export
 */
add_settings_field(
	'rocket_export_options',
	__( 'Export settings:', 'rocket' ),
	'rocket_field',
	'rocket_tools',
	'rocket_display_tools',
	array( 'type' => 'rocket_export_form', 'name' => 'export' )
);

/**
 * Import
 */
add_settings_field(
	'rocket_import_options',
	__( 'Import settings:', 'rocket' ),
	'rocket_field',
	'rocket_tools',
	'rocket_display_tools',
	array( 'type' => 'rocket_import_upload_form' )
);
