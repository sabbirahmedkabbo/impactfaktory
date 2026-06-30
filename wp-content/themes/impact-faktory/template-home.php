<?php
/**
 * Template Name: Homepage Template
 */

get_header();
?>

<main class="page-container hero">
    <div class="hero-wordmark-container">
        <?php echo get_pixel_logo_svg(); ?>
    </div>
    
    <h1 class="hero-headline">We don't follow the market.<br>We disrupt it.</h1>
    
    <p class="hero-subhead">
        <span class="accent-underline">Disruptive marketing, advertising, and event activation</span> designed to make brands unforgettable.
    </p>
    
    <div class="hero-ctas">
        <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="btn btn-primary">Let's Disrupt Something</a>
        <a href="<?php echo esc_url( home_url( '/work' ) ); ?>" class="btn btn-secondary">See Our Work</a>
    </div>
</main>

<section class="page-container" style="padding-top: 0;">
    <h2 class="section-title"><span class="accent-underline">Core Capabilities</span></h2>
    
    <div class="grid-4">
        <!-- Card 1: Filled -->
        <div class="services-card filled">
            <div>
                <div class="card-num">01</div>
                <h3 class="card-title">Marketing &<br>Advertising</h3>
            </div>
            <p class="card-desc">Disruptive campaigns that grab market share, hijack attention, and drive measurable growth across physical and digital channels.</p>
        </div>
        
        <!-- Card 2: Outline -->
        <div class="services-card outline">
            <div>
                <div class="card-num">02</div>
                <h3 class="card-title">Event<br>Activation</h3>
            </div>
            <p class="card-desc">High-impact, immersive live experiences and experiential events that turn passive spectators into die-hard brand advocates.</p>
        </div>
        
        <!-- Card 3: Filled -->
        <div class="services-card filled">
            <div>
                <div class="card-num">03</div>
                <h3 class="card-title">Identity &<br>Narrative</h3>
            </div>
            <p class="card-desc">Forging uncompromising brand systems, identity frameworks, and sharp positioning strategies that command authority.</p>
        </div>
        
        <!-- Card 4: Outline -->
        <div class="services-card outline">
            <div>
                <div class="card-num">04</div>
                <h3 class="card-title">Perception<br>Shift</h3>
            </div>
            <p class="card-desc">Strategic perception engineering campaigns that reshape consumer beliefs, redefine brand narratives, and pivot public opinion.</p>
        </div>
    </div>
</section>

<?php
get_footer();
