(function ($) {
  "use strict";

  // WhatsApp-Popup Funktionalität
  const popup = document.getElementById('whatsapp-popup');
  const closePopup = document.getElementById('close-popup');

  // Popup schließen und Zustand speichern
  if (closePopup) {
      closePopup.addEventListener('click', function (event) {
          event.stopPropagation();
          popup.style.display = 'none';
          localStorage.setItem('popupClosed', 'true');
      });
  }

  // Öffnen von WhatsApp, wenn nicht auf das Schließen-Icon geklickt wurde
  if (popup) {
      popup.addEventListener('click', function (event) {
          if (event.target !== closePopup) {
              window.open('https://wa.me/YOUR_NUMBER', '_blank'); // Ersetze YOUR_NUMBER durch deine WhatsApp-Nummer
          }
      });
  }

  // Überprüfen, ob das Popup geschlossen wurde, und zurücksetzen bei Neuladen
  if (localStorage.getItem('popupClosed') !== 'true' && popup) {
      popup.style.display = 'block'; // Popup wird angezeigt, falls es nicht vorher geschlossen wurde
  }

  // Video-Autoplay Fehlerbehandlung
  document.addEventListener('DOMContentLoaded', function () {
      var video = document.querySelector('video');
      if (video) {
          video.play().catch(function (error) {
              console.log("Autoplay failed due to: ", error);
          });
      }
  });

  // Isotope Initialisierung und Filterfunktion
  $(window).on('load', function () {
      const $container = $('.isotope-container').isotope({
          itemSelector: '.item',
          filter: '.kitesurf-lessons'
      });

      // Filter-Button Eventlistener
      $('.filter-button').on('click', function () {
          const filterValue = $(this).attr('data-filter');
          $('.filter-button').removeClass('active');
          $(this).addClass('active');
          $container.isotope({ filter: filterValue });

          // Update der Detailansicht basierend auf dem Filter
          $('.detail-view').removeClass('active');
          if (filterValue !== '*') {
              $(filterValue).addClass('active');
          }
      });

      // Initial aktivierten Filterbutton triggern
      $('.filter-button.active').trigger('click');

      // Fügt nach einer kurzen Verzögerung eine geladene Klasse hinzu
      setTimeout(() => {
          document.body.classList.add('loaded');
      }, 300);
  });

})(jQuery);
