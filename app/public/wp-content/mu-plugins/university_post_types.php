<?php
function university_post_types() { //Custom Post Type
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
}
add_action('init', 'university_post_types');
