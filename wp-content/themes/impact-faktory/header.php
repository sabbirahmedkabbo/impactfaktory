<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <script>
        // Inline script to prevent theme flash before page load
        (function() {
            var storedTheme = localStorage.getItem('theme');
            var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        })();
    </script>
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
    <div class="nav-container">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo" rel="home">
            <?php echo get_pixel_logo_svg(); ?>
        </a>
        
        <div class="primary-menu-wrapper">
            <nav class="main-navigation">
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'primary',
                    'menu_class'     => 'nav-menu',
                    'container'      => false,
                    'fallback_cb'    => false,
                ) );
                ?>
            </nav>
            
            <button class="theme-toggle-btn" aria-label="Toggle light/dark mode" id="theme-toggle">
                <span class="toggle-track">
                    <span class="toggle-indicator"></span>
                </span>
            </button>
        </div>
    </div>
</header>
