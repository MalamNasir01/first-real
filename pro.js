document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle
    const navs = document.querySelector('.navs');
    const mobileToggle = document.createElement('div');
    mobileToggle.classList.add('mobile-menu-toggle');
    mobileToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    navs.appendChild(mobileToggle);

    // Add click event to toggle
    mobileToggle.addEventListener('click', function() {
        const navMenu = navs.querySelector('ul');
        navMenu.classList.toggle('show');
    });
);