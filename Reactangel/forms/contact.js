
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', async function (event) {
      event.preventDefault();

      let thisForm = this;

      // Show loading and hide previous messages
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      const formData = new FormData(thisForm); // Collect form data

      try {
        // Replace the below URL with your actual Google Apps Script endpoint
        const response = await fetch('https://script.google.com/macros/s/AKfycby1nyJ3nGG-Z3lQ2iGXY1WH0ZGZSYEPzPsUJA0xyxyaxTly6fKRTxS67qs_V29g0V_3dw/exec', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          thisForm.querySelector('.loading').classList.remove('d-block');
          thisForm.querySelector('.sent-message').classList.add('d-block'); // Show success message
          thisForm.reset(); // Reset the form
        } else {
          throw new Error('There was an error submitting the form.');
        }
      } catch (error) {
        // Display error message
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.error-message').innerHTML = error.message || 'Form submission failed!';
        thisForm.querySelector('.error-message').classList.add('d-block');
      }
    });
  });
})();
