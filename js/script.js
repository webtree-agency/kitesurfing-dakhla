(function ($) {
    "use strict";

    // WhatsApp Icon Click Event
    const whatsappIcon = document.getElementById("whatsapp-icon");
    if (whatsappIcon) {
        whatsappIcon.addEventListener("click", function() {
            window.open("https://wa.me/212628283870", "_blank");
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        const offcanvasElement = document.querySelector('#bdNavbar');
        const offcanvasLinks = document.querySelectorAll('.offcanvas-body a[href^="#"]');
    
        offcanvasLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault(); // Verhindert das direkte Scrollen
                const targetId = this.getAttribute('href'); // Holt den Ziel-Anchor
                const targetElement = document.querySelector(targetId);
    
                if (targetElement) {
                    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                    offcanvas.hide(); 
    
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: 'smooth' }); 
                    }, 300); 
                }
            });
        });
    });
    
    // Initialize Swiper for testimonials
    const swiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: '.testimonial-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Play video on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function () {
        const video = document.querySelector('video');
        if (video) {
            video.play().catch(error => {
                console.log("Autoplay failed due to: ", error);
            });
        }
    });

    // Isotope filtering on window load
    $(window).on('load', function () {
        const $container = $('.isotope-container').isotope({
            itemSelector: '.item',
            filter: '.kitesurf-lessons'
        });

        // Filter button click event
        $('.filter-button').on('click', function () {
            const filterValue = $(this).attr('data-filter');
            $('.filter-button').removeClass('active');
            $(this).addClass('active');
            $container.isotope({ filter: filterValue });

            $('.detail-view').removeClass('active');
            if (filterValue !== '*') {
                $(filterValue).addClass('active');
            }
        });

        // Trigger the active filter button on load
        $('.filter-button.active').trigger('click');

        // Add loaded class to body after 300ms
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 300);
    });

})(jQuery);
