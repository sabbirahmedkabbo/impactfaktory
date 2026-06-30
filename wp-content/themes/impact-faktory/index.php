<?php
/**
 * The main template file
 */

get_header();
?>

<main class="page-container">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) : the_post();
            ?>
            <article <?php post_class(); ?> style="margin-bottom: 4rem;">
                <h1 class="section-title" style="margin-bottom: 2rem;"><span class="accent-underline"><?php the_title(); ?></span></h1>
                <div class="entry-content" style="font-size: 1.1rem; line-height: 1.8;">
                    <?php the_content(); ?>
                </div>
            </article>
            <?php
        endwhile;
    else :
        ?>
        <h1 class="section-title"><span class="accent-underline">Nothing Found</span></h1>
        <p>Double check your coordinates or navigate back to the main vector.</p>
        <?php
    endif;
    ?>
</main>

<?php
get_footer();
