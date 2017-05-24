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

 function general_scripts() {

  /**
   * Place jquery in the footer, rather than head, to increase load performance.
   * Deregister jQuery from header
   * Register new Google hosted jQuery in footer
   * Enqeue Google hosted jQuery in footer
   */
    wp_deregister_script('jquery');
    wp_register_script('footer-jquery', "//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js", false, '@hash@', true);
    wp_enqueue_script('footer-jquery');

  /**
   * Built JS Files
   */
    wp_register_script('built', $GLOBALS['template_dir_uri'].'/built.js', array('footer-jquery'), '@hash@', true);
    wp_enqueue_script('built');

  /**
   * Load LiveReload if on Localhost
   */
    if (false !== strpos($GLOBALS['current_url'],'localhost') ) {
      wp_register_script('livereload', $GLOBALS['current_url'].':25710/livereload.js?snipver=1', null, '@hash@', true);
      wp_enqueue_script('livereload');
    };

  };

  add_action('wp_enqueue_scripts', 'general_scripts');

?>