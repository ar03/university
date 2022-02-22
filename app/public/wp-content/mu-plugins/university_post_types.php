<?php
function university_post_types() { //Custom Post Types
    //Campus Post Type
    register_post_type('campus', array( 
        'supports' => array('title', 'editor', 'excerpt'), 
        'rewrite' => array('slug' => 'campuses'), 
        'has_archive' => true,
        'public' => true,
        'labels' => array( 
            'name' => 'Campuses',
            'add_new_item' => 'Add New Campus',
            'edit_item' => 'Edit Campus',
            'all_items' => 'All Campuses',
            'singular_name' => 'Campus'
        ),
        'menu_icon' => 'dashicons-location-alt', 
    ));

    //Event Post Type
    register_post_type('event', array( //names 'event' URL slug
        'supports' => array('title', 'editor', 'excerpt'), //add modern editor and excerpt menu
        'rewrite' => array('slug' => 'events'), //adds plurality to slug
        'has_archive' => true, //creats URL
        'public' => true,
        'labels' => array( //Changes the labels in the admin menu
            'name' => 'Events',
            'add_new_item' => 'Add New Event',
            'edit_item' => 'Edit Event',
            'all_items' => 'All Events',
            'singular_name' => 'Event'
        ),
        'menu_icon' => 'dashicons-calendar', //Wordpress Icons
        'show_in_rest' => true //Allows for Block Editor; New custom post types will use classic editor screen by default
    ));

    //Program Post Type
    register_post_type('program', array( 
        'supports' => array('title', 'editor'), 
        'rewrite' => array('slug' => 'programs'), 
        'has_archive' => true, 
        'public' => true,
        'labels' => array( 
            'name' => 'Programs',
            'add_new_item' => 'Add New Program',
            'edit_item' => 'Edit Program',
            'all_items' => 'All Programs',
            'singular_name' => 'Program'
        ),
        'menu_icon' => 'dashicons-awards', 
        'show_in_rest' => true 
    ));

    //Professor Post Type
    register_post_type('professor', array(
        'show_in_rest' => true, 
        'supports' => array('title', 'editor', 'thumbnail'),  
        'public' => true,
        'labels' => array( 
            'name' => 'Professors',
            'add_new_item' => 'Add New Professor',
            'edit_item' => 'Edit Professor',
            'all_items' => 'All Professors',
            'singular_name' => 'Professor'
        ),
        'menu_icon' => 'dashicons-welcome-learn-more', 
        'show_in_rest' => true 
        ));
}
add_action('init', 'university_post_types');
