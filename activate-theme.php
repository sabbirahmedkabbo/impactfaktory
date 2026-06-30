<?php
require_once __DIR__ . '/wp-load.php';
echo "Current theme before: " . wp_get_theme()->get('Name') . "\n";
echo "Switching theme to impact-faktory...\n";
switch_theme('impact-faktory');
echo "Current theme after: " . wp_get_theme()->get('Name') . "\n";
