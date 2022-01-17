<?php

    while(have_posts()) {
        the_post(); ?>
        <h1>page</h1>
        <h2><?php the_title(); ?></h2>
        <?php the_content(); ?>
       
   <?php }

?>