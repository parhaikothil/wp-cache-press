<?php
/**
 * PHPUnit bootstrap file
 *
 * @package WP_Cache_Press
 */

// Determine the tests directory (from a WP dev checkout).
$_tests_dir = getenv( 'WP_TESTS_DIR' );

// Fallback to the default tests directory.
if ( ! $_tests_dir ) {
	$_tests_dir = '/tmp/wordpress-tests-lib';
}

// Give access to tests_add_filter() function.
require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
	require dirname( dirname( __FILE__ ) ) . '/wp-rocket.php';
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

// Start up the WP testing environment.
require $_tests_dir . '/includes/bootstrap.php';
