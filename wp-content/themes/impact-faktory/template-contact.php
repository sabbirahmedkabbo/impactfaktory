<?php
/**
 * Template Name: Contact Template
 */

get_header();
?>

<main class="page-container contact-container">
    <div class="contact-info">
        <div>
            <h1 class="section-title"><span class="accent-underline">Let's Disrupt</span></h1>
            <p class="contact-subhead">Ready to stop blending in? Tell us what you want to achieve.</p>
        </div>
        
        <div class="contact-details">
            <div class="contact-detail-item">
                <h4>HQ Location</h4>
                <p>Brutalist Block 42, Sector 9, NY</p>
            </div>
            
            <div class="contact-detail-item">
                <h4>Direct Comms</h4>
                <p>disrupt@impactfaktory.com</p>
            </div>
            
            <div class="contact-detail-item">
                <h4>Hotline</h4>
                <p>+1 (800) DISRUPT</p>
            </div>
        </div>
    </div>
    
    <div>
        <form class="contact-form" action="#" method="POST" id="disrupt-form">
            <div class="form-group">
                <label for="contact-name">Your Identity / Brand Name</label>
                <input type="text" id="contact-name" name="name" class="form-input" placeholder="e.g. John Doe / Brand Inc." required>
            </div>
            
            <div class="form-group">
                <label for="contact-email">Secure Email</label>
                <input type="email" id="contact-email" name="email" class="form-input" placeholder="e.g. you@example.com" required>
            </div>
            
            <div class="form-group">
                <label for="contact-service">Selected Vector</label>
                <select id="contact-service" name="service" class="form-input" style="appearance: none; background-color: var(--background);">
                    <option value="marketing">Marketing & Advertising</option>
                    <option value="events">Event Activation & Management</option>
                    <option value="identity">Brand Identity & Narrative Strategy</option>
                    <option value="perception">Perception Shift Campaigns</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="contact-message">The Objective</label>
                <textarea id="contact-message" name="message" class="form-input" placeholder="What are we disrupting? Describe your project goals..." required></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%;">Initiate Contact</button>
        </form>
        
        <div id="form-success-msg" style="display: none; border: var(--border-width) solid var(--accent); padding: 2rem; margin-top: 2rem; border-radius: var(--border-radius); font-weight: 700; text-align: center;">
            OBJECTIVE RECEIVED. WE WILL GET IN TOUCH TO COMMENCE STAGE 1.
        </div>
    </div>
</main>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('disrupt-form');
    const successMsg = document.getElementById('form-success-msg');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.style.display = 'none';
            successMsg.style.display = 'block';
        });
    }
});
</script>

<?php
get_footer();
