<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'F7Tp52P7dyAxL2M1lXJ7TKNlVhAH+bg7YgvDRUfUh3irWBDiNjsBBLgl7FL58RVc338JdNq7MoxWDfHy027GWQ==');
define('SECURE_AUTH_KEY',  '6fnrbC1REqNeKUQlfwI7oFHbt5vJr/QO8l74IkBYjMV1YcuNfrk5oLE9A74cMSX1VrzgMWL7qkMAs86+A5Z/UQ==');
define('LOGGED_IN_KEY',    'b9F/eNTZCqRSlDR4mQ1XZQLk9DK6g0t+XGHZbKfD90XNedm6oSmhEvTR+c1Re2HLndapuJoNqcUdXaROb/Vyrw==');
define('NONCE_KEY',        'e8fs+NSBoMHiLQVKLNjGqhtVEumyTwSu5eBFl84d08DE5mOVrcgp9ymvm4qtGxv/3wcjCV/4Ss59A61s7M06cw==');
define('AUTH_SALT',        'Xq/z2MFtmGC1gGXTRVJ1Rss29TpEDLTb9mr06Bbafk9ndFwT/TX2vNnWgQvcghNyv3MklycoX7XNqgSoQb2tTA==');
define('SECURE_AUTH_SALT', 'mANuiB2Dd1G8pJ5uH2VexHCOXgrl26csSvCI/s4gc5MzBO7s38ufnsXe6zmdr/1mDnPyAXkSgIn29rEOAJEWYg==');
define('LOGGED_IN_SALT',   'pV1I0CqLZdWhmb50O5JKs2DMA/RcKRVryjlyLUmeonBIOMvvV6cco2Tn/bjCcwMUTWqgSmCw2Prw5QRCAPZqBA==');
define('NONCE_SALT',       'jpBk0HA4TrygYSztRXKL00xWNrJvcMkJ+UYjM26NygVWl8zXySsaUuDogsPu2b4D0UC0ZK0CKOPnZvlsmm4S8A==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
