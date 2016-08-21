<?php
/*
This is a sample local-config.php file
In it, you *must* include the four main database defines

You may include other settings here that you only want enabled on your local development checkouts
*/

define( 'DB_NAME', 'local_db_name' );
define( 'DB_USER', 'local_db_user' );
define( 'DB_PASSWORD', 'local_db_password' );
define( 'DB_HOST', 'localhost' ); // Probably 'localhost'

define( 'SAVEQUERIES', true );
define( 'WP_DEBUG', true );

define( 'UPLOADS', '../media' );
define( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/wp-content' );

// We have to set what subfolder we are within our localhost folder as I can't figure out how to set up individual hosts for each install.
// define('WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/EDIT-TO-ROOT-INSTALL/wp-content');