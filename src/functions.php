<?php
/**
 * Theme functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * {@link https://codex.wordpress.org/Plugin_API}
 *
 * PHP version 5
 *
 * @category PHP
 * @package  @theme_folder@
 * @author   @author_name@  <@author_email@>
 * @version  Release: @package_version@
 * @link     @git_link@ 
 */ 

  $GLOBALS['template_dir_uri'] = get_template_directory_uri();
  $GLOBALS['current_url'] = 'http://'.$_SERVER['SERVER_NAME'];

  require'includes/general_scripts.php';
  require'includes/general_styles.php';
  require'includes/disable_emojis.php';

?>