/**
 * Impact Faktory Interactive Frontend Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initAnimatedBackground();
});

/**
 * Theme Toggle Functionality
 */
function initThemeToggle() {
    const htmlElement = document.documentElement;
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    
    if (!toggleBtn) return;

    // Retrieve theme preference
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = htmlElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Trigger a custom event for other scripts (like canvas) to react to theme change
        window.dispatchEvent(new CustomEvent('themechanged', { detail: { isDark } }));
    });
}

/**
 * Animated Background Functionality (Canvas Grid)
 */
function initAnimatedBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let cells = [];
    const cellSize = 24;
    
    // Theme opacity settings
    const getThemeConfig = () => {
        const isDark = document.documentElement.classList.contains('dark');
        return {
            maxOpacity: isDark ? 0.14 : 0.08,
            textColor: getComputedStyle(document.documentElement).getPropertyValue('--text').trim()
        };
    };

    let themeConfig = getThemeConfig();

    // Listen to theme changes to immediately update color values and opacity limits
    window.addEventListener('themechanged', () => {
        themeConfig = getThemeConfig();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            drawStaticGrid();
        }
    });

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initGrid();
    }

    // Initialize grid cells
    function initGrid() {
        cells = [];
        const cols = Math.ceil(canvas.width / cellSize);
        const rows = Math.ceil(canvas.height / cellSize);

        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                // ~12% cells render in signature yellow #FFE600, rest in text color
                const isYellow = Math.random() < 0.12;
                
                cells.push({
                    x: x * cellSize,
                    y: y * cellSize,
                    isYellow: isYellow,
                    // Randomized cycle cycle (duration) between 3-8 seconds (in milliseconds)
                    duration: 3000 + Math.random() * 5000,
                    // Randomized phase offset
                    phase: Math.random() * Math.PI * 2
                });
            }
        }
    }

    // Animation Loop
    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        cells.forEach(cell => {
            // Calculate independent sine-wave opacity
            const timeFactor = (timestamp + cell.phase) / cell.duration;
            // Map sine [-1, 1] to [0, 1]
            const sinVal = (Math.sin(timeFactor * Math.PI * 2) + 1) / 2;
            const cellOpacity = sinVal * themeConfig.maxOpacity;

            // Choose color based on cell configuration
            if (cell.isYellow) {
                ctx.fillStyle = `rgba(255, 230, 0, ${cellOpacity})`;
            } else {
                // Parse the current theme text color (rgb format)
                ctx.fillStyle = convertHexOrNamedToRgba(themeConfig.textColor, cellOpacity);
            }

            // Draw square (keep tiny 1px gap for grid aesthetic)
            ctx.fillRect(cell.x + 1, cell.y + 1, cellSize - 2, cellSize - 2);
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    // Draw static faint grid for prefers-reduced-motion
    function drawStaticGrid() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        cells.forEach((cell, index) => {
            // Static low opacity (2% for text, 4% for yellow)
            const staticOpacity = cell.isYellow ? 0.04 : 0.02;
            if (cell.isYellow) {
                ctx.fillStyle = `rgba(255, 230, 0, ${staticOpacity})`;
            } else {
                ctx.fillStyle = convertHexOrNamedToRgba(themeConfig.textColor, staticOpacity);
            }
            ctx.fillRect(cell.x + 1, cell.y + 1, cellSize - 2, cellSize - 2);
        });
    }

    // Utility to convert color strings to rgba
    function convertHexOrNamedToRgba(colorStr, opacity) {
        if (colorStr.startsWith('#')) {
            const hex = colorStr.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        // Fallback for rgb/rgba strings
        if (colorStr.startsWith('rgb')) {
            const rgbParts = colorStr.match(/\d+/g);
            if (rgbParts && rgbParts.length >= 3) {
                return `rgba(${rgbParts[0]}, ${rgbParts[1]}, ${rgbParts[2]}, ${opacity})`;
            }
        }
        // Fallback to plain black/white if unresolved
        return colorStr === '#FAFAFA' ? `rgba(250, 250, 250, ${opacity})` : `rgba(24, 24, 27, ${opacity})`;
    }

    // Handle Reduced Motion preferences
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleMotionPreference() {
        if (motionQuery.matches) {
            drawStaticGrid();
        } else {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(animate);
        }
    }

    // Initial setup
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    handleMotionPreference();

    // Listen to changes in motion preference
    motionQuery.addEventListener('change', handleMotionPreference);
}
