<?php
/**
 * Impact Faktory theme functions and definitions
 */

if ( ! function_exists( 'impact_faktory_setup' ) ) {
    function impact_faktory_setup() {
        // Add default posts and comments RSS feed links to head.
        add_theme_support( 'automatic-feed-links' );

        // Let WordPress manage the document title.
        add_theme_support( 'title-tag' );

        // Enable support for Post Thumbnails on posts and pages.
        add_theme_support( 'post-thumbnails' );

        // Register navigation menu
        register_nav_menus( array(
            'primary' => esc_html__( 'Primary Menu', 'impact-faktory' ),
        ) );

        // Switch default core markup for search form, comment form, etc., to HTML5.
        add_theme_support( 'html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        ) );
    }
}
add_action( 'after_setup_theme', 'impact_faktory_setup' );

/**
 * Enqueue scripts and styles.
 */
function impact_faktory_scripts() {
    // Google Fonts: Space Grotesk and Archivo
    wp_enqueue_style( 'impact-faktory-fonts', 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Space+Grotesk:wght@400;700&display=swap', array(), null );

    // Custom theme CSS
    wp_enqueue_style( 'impact-faktory-theme-css', get_template_directory_uri() . '/assets/css/theme.css', array(), '1.0.0' );

    // Main stylesheet
    wp_enqueue_style( 'impact-faktory-style', get_stylesheet_uri(), array(), '1.0.0' );

    // Main JS
    wp_enqueue_script( 'impact-faktory-js', get_template_directory_uri() . '/assets/js/theme.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'impact_faktory_scripts' );

/**
 * Automatically set up pages, navigation, and front page options upon theme activation.
 */
function impact_faktory_auto_setup_pages() {
    $pages = array(
        'home' => array(
            'title'    => 'Home',
            'template' => 'template-home.php',
            'order'    => 1
        ),
        'about' => array(
            'title'    => 'About',
            'template' => 'template-about.php',
            'order'    => 2
        ),
        'services' => array(
            'title'    => 'Services',
            'template' => 'template-services.php',
            'order'    => 3
        ),
        'work' => array(
            'title'    => 'Work',
            'template' => 'template-work.php',
            'order'    => 4
        ),
        'contact' => array(
            'title'    => 'Contact',
            'template' => 'template-contact.php',
            'order'    => 5
        )
    );

    // Get or Create Primary Menu
    $menu_name = 'Main Menu';
    $menu_exists = wp_get_nav_menu_object( $menu_name );
    $menu_id = $menu_exists ? $menu_exists->term_id : wp_create_nav_menu( $menu_name );

    $created_page_ids = array();

    foreach ( $pages as $slug => $data ) {
        // Check if page already exists
        $page = get_page_by_path( $slug );
        
        if ( ! $page ) {
            // Create page
            $page_id = wp_insert_post( array(
                'post_title'   => $data['title'],
                'post_name'    => $slug,
                'post_status'  => 'publish',
                'post_type'    => 'page',
                'post_content' => '',
            ) );
            
            if ( $page_id && ! is_wp_error( $page_id ) ) {
                update_post_meta( $page_id, '_wp_page_template', $data['template'] );
                $created_page_ids[$slug] = $page_id;
            }
        } else {
            $created_page_ids[$slug] = $page->ID;
            // Keep template correct
            update_post_meta( $page->ID, '_wp_page_template', $data['template'] );
        }
    }

    // Assign front page settings if home page exists
    if ( isset( $created_page_ids['home'] ) ) {
        update_option( 'show_on_front', 'page' );
        update_option( 'page_on_front', $created_page_ids['home'] );
    }

    // Populate menu if it was just created
    if ( $menu_id && ! $menu_exists ) {
        foreach ( $pages as $slug => $data ) {
            if ( isset( $created_page_ids[$slug] ) ) {
                wp_update_nav_menu_item( $menu_id, 0, array(
                    'menu-item-title'     => $data['title'],
                    'menu-item-object'    => 'page',
                    'menu-item-object-id' => $created_page_ids[$slug],
                    'menu-item-type'      => 'post_type',
                    'menu-item-status'    => 'publish',
                    'menu-item-position'  => $data['order']
                ) );
            }
        }

        // Set menu location
        $locations = get_theme_mod( 'nav_menu_locations' );
        $locations['primary'] = $menu_id;
        set_theme_mod( 'nav_menu_locations', $locations );
    }
}
add_action( 'after_switch_theme', 'impact_faktory_auto_setup_pages' );

/**
 * Helper function to generate the custom pixel-bitmap logo SVG
 */
function get_pixel_logo_svg() {
    $letters = array(
        'I' => array(
            array(1,1,1,1,1),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(1,1,1,1,1)
        ),
        'M' => array(
            array(1,0,0,0,1),
            array(1,1,0,1,1),
            array(1,1,0,1,1),
            array(1,0,1,0,1),
            array(1,0,1,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1)
        ),
        'P' => array(
            array(1,1,1,1,0),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,1,1,1,0),
            array(1,0,0,0,0),
            array(1,0,0,0,0),
            array(1,0,0,0,0),
            array(1,0,0,0,0)
        ),
        'A' => array(
            array(0,1,1,1,0),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,1,1,1,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1)
        ),
        'C' => array(
            array(0,1,1,1,1),
            array(1,0,0,0,0),
            array(1,0,0,0,0),
            array(1,0,0,0,0),
            array(1,0,0,0,0),
            array(1,0,0,0,0),
            array(1,0,0,0,0),
            array(1,0,0,0,0),
            array(0,1,1,1,1)
        ),
        'T' => array(
            array(1,1,1,1,1),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0)
        ),
        'F' => array(
            array(1,1,1,1,1),
            array(1,0,0,0,0),
            array(1,0,0,0,0),
            array(1,0,0,0,0),
            array(1,1,1,1,0),
            array(1,0,0,0,0),
            array(1,0,0,0,0),
            array(1,0,0,0,0),
            array(1,0,0,0,0)
        ),
        'K' => array(
            array(1,0,0,0,1),
            array(1,0,0,1,0),
            array(1,0,1,0,0),
            array(1,1,0,0,0),
            array(1,1,0,0,0),
            array(1,0,1,0,0),
            array(1,0,0,1,0),
            array(1,0,0,0,1),
            array(1,0,0,0,1)
        ),
        'O' => array(
            array(0,1,1,1,0),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(0,1,1,1,0)
        ),
        'R' => array(
            array(1,1,1,1,0),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(1,1,1,1,0),
            array(1,0,1,0,0),
            array(1,0,0,1,0),
            array(1,0,0,0,1),
            array(1,0,0,0,1)
        ),
        'Y' => array(
            array(1,0,0,0,1),
            array(1,0,0,0,1),
            array(0,1,0,1,0),
            array(0,1,0,1,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0),
            array(0,0,1,0,0)
        )
    );

    $word1 = array('I', 'M', 'P', 'A', 'C', 'T');
    $word2 = array('F', 'A', 'K', 'T', 'O', 'R', 'Y');

    $svg = '<svg viewBox="0 0 80 9" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">';
    $svg .= '<defs>';
    $svg .= '<linearGradient id="logo-grad" x1="0%" y1="100%" x2="100%" y2="0%">';
    $svg .= '<stop offset="0%" stop-color="var(--text)" />';
    $svg .= '<stop offset="55%" stop-color="var(--text)" />';
    $svg .= '<stop offset="78%" stop-color="#FFE600" />';
    $svg .= '<stop offset="100%" stop-color="#FFE600" />';
    $svg .= '</linearGradient>';
    $svg .= '</defs>';
    $svg .= '<g fill="url(#logo-grad)">';

    // Render IMPACT
    $xOffset = 0;
    foreach ($word1 as $char) {
        $matrix = $letters[$char];
        for ($row = 0; $row < 9; $row++) {
            for ($col = 0; $col < 5; $col++) {
                if ($matrix[$row][$col] === 1) {
                    $svg .= '<rect x="' . ($xOffset + $col) . '" y="' . $row . '" width="1" height="1" />';
                }
            }
        }
        $xOffset += 6;
    }

    // Space between words is 4px
    $xOffset = 39;

    // Render FAKTORY
    foreach ($word2 as $char) {
        $matrix = $letters[$char];
        for ($row = 0; $row < 9; $row++) {
            for ($col = 0; $col < 5; $col++) {
                if ($matrix[$row][$col] === 1) {
                    $svg .= '<rect x="' . ($xOffset + $col) . '" y="' . $row . '" width="1" height="1" />';
                }
            }
        }
        $xOffset += 6;
    }

    $svg .= '</g>';
    $svg .= '</svg>';

    return $svg;
}

