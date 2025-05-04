// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const themeToggle = document.getElementById('theme-toggle');
    const animationToggle = document.getElementById('animation-toggle');
    const logo = document.getElementById('logo');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const newsletterForm = document.getElementById('newsletter-form');
    
    // Check for saved user preferences in localStorage
    const savedTheme = localStorage.getItem('theme');
    const savedAnimations = localStorage.getItem('animations');
    
    // Apply saved theme preference
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Toggle Light Mode';
    }
    
    // Apply saved animation preference
    if (savedAnimations === 'disabled') {
        disableAnimations();
        animationToggle.textContent = 'Enable Animations';
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = 'Toggle Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = 'Toggle Dark Mode';
        }
    });
    
    // Animation toggle functionality
    animationToggle.addEventListener('click', function() {
        const animationsDisabled = document.body.classList.toggle('no-animations');
        
        // Save preference to localStorage
        if (animationsDisabled) {
            localStorage.setItem('animations', 'disabled');
            animationToggle.textContent = 'Enable Animations';
            disableAnimations();
        } else {
            localStorage.setItem('animations', 'enabled');
            animationToggle.textContent = 'Disable Animations';
            enableAnimations();
        }
    });
    
    // Add to cart button animation
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.classList.add('clicked');
            
            // Remove animation class after it completes
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Save to cart in localStorage
            const flowerName = this.parentElement.querySelector('h3').textContent;
            const flowerPrice = this.parentElement.querySelector('.price').textContent;
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name: flowerName, price: flowerPrice });
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Show confirmation animation
            showConfirmation(`${flowerName} added to cart!`);
        });
    });
    
    // Newsletter form submission
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // Save email to localStorage
        let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        
        // Show confirmation and reset form
        showConfirmation('Thanks for subscribing!');
        this.reset();
    });
    
    // Logo hover animation
    logo.addEventListener('mouseenter', function() {
        if (!document.body.classList.contains('no-animations')) {
            this.style.transform = 'rotate(-5deg)';
        }
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0)';
    });
    
    // Helper function to disable animations
    function disableAnimations() {
        document.body.classList.add('no-animations');
        const animatedElements = document.querySelectorAll('.pulse, .bounce, .slide-in, .rotate');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
        });
    }
    
    // Helper function to enable animations
    function enableAnimations() {
        document.body.classList.remove('no-animations');
        const animatedElements = document.querySelectorAll('.pulse, .bounce, .slide-in, .rotate');
        animatedElements.forEach(el => {
            el.style.animation = '';
        });
    }
    
    // Show confirmation message with animation
    function showConfirmation(message) {
        const confirmation = document.createElement('div');
        confirmation.className = 'confirmation-message';
        confirmation.textContent = message;
        
        // Style the confirmation message
        confirmation.style.position = 'fixed';
        confirmation.style.bottom = '20px';
        confirmation.style.right = '20px';
        confirmation.style.backgroundColor = '#4CAF50';
        confirmation.style.color = 'white';
        confirmation.style.padding = '15px 25px';
        confirmation.style.borderRadius = '5px';
        confirmation.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        confirmation.style.zIndex = '1000';
        confirmation.style.transform = 'translateX(150%)';
        confirmation.style.transition = 'transform 0.3s ease-out';
        
        document.body.appendChild(confirmation);
        
        // Trigger the slide-in animation
        setTimeout(() => {
            confirmation.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            confirmation.style.transform = 'translateX(150%)';
            setTimeout(() => {
                confirmation.remove();
            }, 300);
        }, 3000);
    }
});
