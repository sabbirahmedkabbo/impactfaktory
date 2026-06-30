<?php
/**
 * The base configuration for WordPress
 *
 * @package WordPress
 */

// Dummy database credentials (ignored by SQLite Database Integration plugin)
define( 'DB_NAME', 'impact_faktory' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// Custom secret keys and salts (locally generated random strings)
define( 'AUTH_KEY',         'b3_m^#P1X-kLp92;wqVn+Z}tT!e[y|M4$QGz=U*sRxA{&D6H8C%' );
define( 'SECURE_AUTH_KEY',  'p~A5h#M2X-kLp92;wqVn+Z}tT!e[y|M4$QGz=U*sRxA{&D6H8C%' );
define( 'LOGGED_IN_KEY',    'f_9*m#P1X-kLp92;wqVn+Z}tT!e[y|M4$QGz=U*sRxA{&D6H8C%' );
define( 'NONCE_KEY',        'x_2Lm#P1X-kLp92;wqVn+Z}tT!e[y|M4$QGz=U*sRxA{&D6H8C%' );
define( 'AUTH_SALT',        'a_8Jm#P1X-kLp92;wqVn+Z}tT!e[y|M4$QGz=U*sRxA{&D6H8C%' );
define( 'SECURE_AUTH_SALT', 's_1Km#P1X-kLp92;wqVn+Z}tT!e[y|M4$QGz=U*sRxA{&D6H8C%' );
define( 'LOGGED_IN_SALT',   'd_3Lm#P1X-kLp92;wqVn+Z}tT!e[y|M4$QGz=U*sRxA{&D6H8C%' );
define( 'NONCE_SALT',       'g_5Nm#P1X-kLp92;wqVn+Z}tT!e[y|M4$QGz=U*sRxA{&D6H8C%' );

$table_prefix = 'wp_';

define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
