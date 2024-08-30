(function($) {

    "use strict";

        // init Chocolat light box
        var initChocolat = function () {
          Chocolat(document.querySelectorAll('.image-link'), {
            imageSize: 'contain',
            loop: true,
          })
        }

    $(document).ready(function() {

      initChocolat();

      /* Video */
      var $videoSrc;  
        $('.play-btn').click(function() {
          $videoSrc = $(this).data( "src" );
        });

        $('#myModal').on('shown.bs.modal', function (e) {

        $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
      })

      $('#myModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src',$videoSrc); 
      })
        
      var swiper = new Swiper(".slider", {
        effect: "fade",
        pagination: {
          el: ".slider-pagination",
          clickable: true,
        },
      });

      var swiper = new Swiper(".testimonial-swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: ".testimonial-pagination",
          clickable: true,
        },
      });

      var swiper = new Swiper(".services-swiper", {
        slidesPerView: 5,
        spaceBetween: 120,
        freeMode: true,
        pagination: {
          el: ".services-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          572: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        },
      });

          // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      autoplay: true,
      loop: true,
      spaceBetween: 8,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    var large_slider = new Swiper(".product-large-slider", {
      autoplay: true,
      loop:true,
      spaceBetween: 10,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
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