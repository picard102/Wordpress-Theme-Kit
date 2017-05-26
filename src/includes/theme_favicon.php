<?php
/**
 * Favicon
 *
 * PHP version 5
 *
 * @category PHP
 * @package  @theme_folder@
 * @author   @author_name@  <@author_email@>
 * @version  Release: @package_version@
 * @link     @git_link@
 */

function theme_favicons(){
  $differentAdmin = true;
  $favicon_path = get_template_directory_uri().'/assets/favicon/';
  ?>

<link rel="apple-touch-icon" sizes="180x180" href="<?php echo $favicon_path;?>apple-touch-icon.png">
<link rel="icon" type="image/png" href="<?php echo $favicon_path;?>favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="<?php echo $favicon_path;?>favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="<?php echo $favicon_path;?>manifest.json">
<link rel="mask-icon" href="<?php echo $favicon_path;?>safari-pinned-tab.svg" color="#bd0a0a">
<meta name="apple-mobile-web-app-title" content="Stratford Reviews">
<meta name="application-name" content="Stratford Reviews">
<meta name="theme-color" content="#ffffff">
<?php }
add_action( 'wp_head', 'theme_favicons' );
add_action( 'admin_head', 'theme_favicons' );

?>