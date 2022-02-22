<?php

add_action('rest_api_init', 'univeristyRegisterSearch');
function univeristyRegisterSearch() {
  register_rest_route('university/v1', 'search', array(//first arg = name, second arg = route, third arg =
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => 'universitySearchResults'
  ));  
}

function universitySearchResults() {
  return 'you created a route';
}