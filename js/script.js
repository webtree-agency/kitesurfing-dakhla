(function($) {

    "use strict";
    $(document).ready(function() {
      document.addEventListener('DOMContentLoaded', function () {
        const video = document.querySelector('video');
        video.muted = true; 
        video.play().catch(error => {
            console.log('Autoplay wurde blockiert:', error);
        });
    });
         
    window.addEventListener("load", () => {
      // Initialize Isotope on the container
      const $container = $('.isotope-container').isotope({
        itemSelector: '.item',
        filter: '.kitesurf-lessons'
      });
    
      // Set up click event listener for filter buttons
      $('.filter-button').on('click', function () {
        const filterValue = $(this).attr('data-filter');
    
        // Update active class on buttons
        $('.filter-button').removeClass('active');
        $(this).addClass('active');
    
        // Apply the filter with Isotope
        $container.isotope({ filter: filterValue });
    
        // Update the detail view based on filter
        $('.detail-view').removeClass('active');
        if (filterValue !== '*') {
          $(filterValue).addClass('active');
        }
      });
    
      // Trigger click on the initially active filter button
      $('.filter-button.active').trigger('click');
    
      // Add loaded class after a delay
      setTimeout(() => {
        document.body.classList.add('loaded');
      }, 300);
    });    
}); // End of a document

})(jQuery);