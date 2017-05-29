<?php
/**
 * Output general scripts for site wide usage
 *
 * PHP version 5
 *
 * @category PHP
 * @package  @theme_folder@
 * @author   @author_name@  <@author_email@>
 * @version  Release: @package_version@
 * @link     @git_link@
 */

/**
 * Place jquery in the footer, rather than head, to increase load performance.
 * Deregister jQuery from header
 * Register new Google hosted jQuery in footer
 * Enqeue Google hosted jQuery in footer
 */
function jqreset_scripts() {
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js', false, null, true );
    wp_enqueue_script( 'jquery' );
};

/**
 * Move Scripts to footer
 */
function wpse_173601_enqueue_scripts() {
    wp_scripts()->add_data( 'jquery-core', 'group', 1 );
    wp_scripts()->add_data( 'jquery-migrate', 'group', 1 );
}
add_action( 'wp_enqueue_scripts', 'wpse_173601_enqueue_scripts' );

/**
 * Load Theme scripts
 */
function theme_scripts() {

  /**
   * Built JS Files
   * If Admin load without the footer jquery dependancy.
   * Else require the footer moved to the footer.
   */
  if ( ! is_admin() ) {
    wp_register_script( 'built', $GLOBALS['template_dir_uri'] . '/built.js', array( 'jquery' ), '@hash@', true );
  } else {
    wp_register_script( 'built', $GLOBALS['template_dir_uri'] . '/admin.js', array( 'jquery' ), '@hash@', true );
  }
  wp_enqueue_script( 'built' );

  /**
   * Load LiveReload if on Localhost
   */
  if ( false !== strpos( $GLOBALS['current_url'],'stratford.dev' ) ) {
    wp_register_script( 'livereload', $GLOBALS['current_url'] . ':25710/livereload.js?snipver=1', null, '@hash@', true );
    wp_enqueue_script( 'livereload' );
  };

};

add_action( 'admin_enqueue_scripts', 'theme_scripts' );
add_action( 'wp_enqueue_scripts', 'jqreset_scripts' );
add_action( 'wp_enqueue_scripts', 'theme_scripts' );


/**
 * Localize our AJAX
 */
function wpa_scripts() {
  $script_data = array(
      'path' => get_template_directory_uri(),
  );
  wp_localize_script( 'built', 'wpa_data', $script_data );
}
add_action( 'admin_enqueue_scripts', 'wpa_scripts' );
add_action( 'wp_enqueue_scripts', 'wpa_scripts' );


/**
 * AJAX URL Frontend
 */
function theme_ajaxurl() {
  echo '<script type="text/javascript">
    var ajaxurl = "' . esc_html( admin_url( 'admin-ajax.php' ) ) . '";
  </script>';
}
add_action( 'wp_head', 'theme_ajaxurl' );
