<?php
/**
 * Template Name: Work Template
 */

get_header();

// Portfolios data array
$case_studies = array(
    array(
        'client'    => 'Aura Drinks',
        'title'     => 'Overthrowing the Soda Giant',
        'category'  => 'marketing',
        'cat_label' => 'Marketing & Advertising',
        'problem'   => 'Aura was completely lost in the media noise of corporate soda behemoths.',
        'approach'  => 'Launched a high-contrast guerrilla blind taste-test campaign, accompanied by bold, direct-response OOH billboards placed adjacent to the soda giants.',
        'result'    => 'A 240% increase in regional search volume, 4.2M social impressions, and 35k new retail store shelves secured.'
    ),
    array(
        'client'    => 'Apex Athletics',
        'title'     => 'The Cage Activation',
        'category'  => 'events',
        'cat_label' => 'Event Activation',
        'problem'   => 'Traditional shoe launches had become clinical and boring, failing to attract younger urban athletes.',
        'approach'  => 'Constructed a dark, brutalist "cage" in the city center where participants tested trainers on dynamic terrain (rock, water, gravel) under red strobe lights.',
        'result'    => '12,000+ active participants, full sell-out of the product line in 48 hours, and 100% user-generated social amplification.'
    ),
    array(
        'client'    => 'Nexis Tech',
        'title'     => 'Rebranding the Invisible',
        'category'  => 'identity',
        'cat_label' => 'Brand Identity',
        'problem'   => 'Nexis built high-tech enterprise software, but their corporate brand looked outdated and soft.',
        'approach'  => 'Reconstructed their visual identity around a stark, pixel-based geometric layout utilizing black, white, and a sharp yellow highlight scheme.',
        'result'    => 'Featured in 12 global design blogs, enterprise leads grew by 60%, and employee recruitment saw a 140% surge.'
    ),
    array(
        'client'    => 'EcoCorp',
        'title'     => 'Flipping the Green Narrative',
        'category'  => 'perception',
        'cat_label' => 'Perception Shift',
        'problem'   => 'EcoCorp was facing public backlash and activist campaigns regarding their manufacturing carbon footprints.',
        'approach'  => 'Created an interactive, real-time "CO2 Accountability" tracker widget and hosted raw, unedited live debates between executives and environmentalists.',
        'result'    => 'Shifted public sentiment from negative (-40) to positive (+25), neutralized press attacks, and set a new standard for transparency.'
    )
);
?>

<main class="page-container">
    <h1 class="section-title"><span class="accent-underline">Our Work</span></h1>
    
    <!-- Filter Buttons -->
    <div class="work-filter-bar">
        <button class="filter-btn active" data-filter="all">All Projects</button>
        <button class="filter-btn" data-filter="marketing">Marketing</button>
        <button class="filter-btn" data-filter="events">Event Activation</button>
        <button class="filter-btn" data-filter="identity">Brand Identity</button>
        <button class="filter-btn" data-filter="perception">Perception Shift</button>
    </div>

    <!-- Case Studies Grid -->
    <div style="display: flex; flex-direction: column; gap: 4rem;">
        <?php foreach ( $case_studies as $study ) : ?>
            <div class="case-study-card" data-category="<?php echo esc_attr( $study['category'] ); ?>">
                <div class="case-study-header">
                    <div>
                        <span class="case-study-client"><?php echo esc_html( $study['client'] ); ?></span>
                        <h2 class="case-study-title"><?php echo esc_html( $study['title'] ); ?></h2>
                    </div>
                    <span class="case-study-category"><?php echo esc_html( $study['cat_label'] ); ?></span>
                </div>
                
                <div class="case-study-grid">
                    <div>
                        <h4 class="case-study-col-title">The Problem</h4>
                        <p class="case-study-col-text"><?php echo esc_html( $study['problem'] ); ?></p>
                    </div>
                    <div>
                        <h4 class="case-study-col-title">Our Approach</h4>
                        <p class="case-study-col-text"><?php echo esc_html( $study['approach'] ); ?></p>
                    </div>
                    <div>
                        <h4 class="case-study-col-title">The Result</h4>
                        <p class="case-study-col-text" style="font-weight: 700; color: var(--accent); background-color: var(--text); padding: 1rem; border-radius: var(--border-radius);"><?php echo esc_html( $study['result'] ); ?></p>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</main>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.case-study-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
</script>

<?php
get_footer();
