(function ($) {
  "use strict";

    document.getElementById("whatsapp-icon").addEventListener("click", function() {
    window.open("https://wa.me/212628283870", "_blank");
    });

  document.addEventListener('DOMContentLoaded', function () {
      var video = document.querySelector('video');
      if (video) {
          video.play().catch(function (error) {
              console.log("Autoplay failed due to: ", error);
          });
      }
  });

  $(window).on('load', function () {
      const $container = $('.isotope-container').isotope({
          itemSelector: '.item',
          filter: '.kitesurf-lessons'
      });

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

      $('.filter-button.active').trigger('click');

      setTimeout(() => {
          document.body.classList.add('loaded');
      }, 300);
  });

})(jQuery);
