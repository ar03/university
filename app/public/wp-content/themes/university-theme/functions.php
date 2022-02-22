<?php

function pageBanner($args = NULL) { 
    
    if(!$args['title']) {
        $args['title'] = get_the_title();
    }
    if(!$args['subtitle']) {
        $args['subtitle'] = get_field('page_banner_subtitle');
    }
    if(!$args['image']) {
        if(get_field('page_banner_background_image') AND !is_archive() AND !is_home() ) {
            $args['image'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
        } else {
            $args['image'] = get_theme_file_uri('/images/ocean.jpg');
        }
    }

?>  
<div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?= $args['image']; ?>);"></div>
      <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title"><?= $args['title'] ?></h1>
        <div class="page-banner__intro">
          <p><?= $args['subtitle']; ?></p>
        </div>
      </div>
    </div>
</div>  
<?php }




function university_files() {
    //wp_enqueue_script('search-js', get_theme_file_uri('/js/search.js'), NULL, microtime(), true);
    wp_enqueue_script('googleMaps', '//maps.googleapis.com/maps/api.js?key=AIzaSyC38gBtNXhfxvJZi9xV-Zc8hmSkWBr8vQY', NULL, '1.0', false);
    wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
    wp_enqueue_style('university_main_styles', get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style('university_extra_styles', get_theme_file_uri('/build/index.css'));
    wp_enqueue_style('font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('google-fonts', 'fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
}
add_action('wp_enqueue_scripts', 'university_files');

function university_features() {
    register_nav_menu('footerMenuOne', 'Footer Menu One');
    register_nav_menu('footerMenuTwo', 'Footer Menu Two');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_image_size('professorLandscape', 400, 260, true);//3rd arg is cropping - starting at 'left' or 'right', 'top' or 'bottom', use plugin 'manuel image crop tomasz'
    add_image_size('professorPortrait', 480, 650, true);
    add_image_size('pageBanner', 1500, 350, true);
}

add_action('after_setup_theme', 'university_features');

function university_adjust_queries($query) {
    if (!is_admin() AND is_post_type_archive('campus') AND is_main_query()) {
        $query->set('posts_per_page', -1);
    }
    if (!is_admin() AND is_post_type_archive('program') AND is_main_query()) {
        $query->set('orderby', 'title');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', -1);
    }

    if (!is_admin() AND is_post_type_archive('event') AND $query->is_main_query()) {
        $today = date('Ymd');
        $query->set('meta_key', 'event_date');
        $query->set('orderby', 'meta_value_num');
        $query->set('order', 'ASC');
        $query->set('meta_query', array(
            array(
              'key' => 'event_date',
              'compare' => '>=',
              'value' => $today,
              'type' => 'numeric'//helps WP compare numbers for this query
            )
          ));
    }
}

add_action('pre_get_posts', 'university_adjust_queries');

function universityMapKey($api) {
    $api['key'] = 'AIzaSyC38gBtNXhfxvJZi9xV-Zc8hmSkWBr8vQY';
    return $api;
}

add_filter('acf/fields/google_map/api', 'universityMapKey');

//Moving custom post types to wp-content/mu-plugins 
