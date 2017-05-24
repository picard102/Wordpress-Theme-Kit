<?php
/**
 * Theme styles
 *
 * PHP version 5
 *
 * @category PHP
 * @package  @theme_folder@
 * @author   @author_name@  <@author_email@>
 * @version  Release: @package_version@
 * @link     @git_link@
 */

  function general_styles() {
    wp_enqueue_style('pcto_reset', $GLOBALS['template_dir_uri'].'/style.css', false, '@hash@', 'screen');
  }
  add_action('wp_enqueue_scripts', 'general_styles');

?>