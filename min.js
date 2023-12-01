document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submit');
  const phoneInput = document.getElementById('phone');

  $('#phone').on('focusin', function() {
    $('.number_text').attr('id', 'positionChange');
  });

  $('#phone').on('focusout', function() {
    if (!this.value) {
      $('.number_text').removeAttr('id');
    }
  });

  submitButton.addEventListener('click', function() {
    const phoneNumber = phoneInput.value;

    // Make a request to your Flask backend using fetch
    fetch('/api/get_user_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber }),
      })
      .then(response => response.json())
      .then(function(userInfo) {
        // Assuming the response contains user information

        // Check if the 'name' property is present in userInfo
        const name = userInfo.hasOwnProperty('name') ? userInfo.name : '';

        // Convert userInfo object to query parameters
        const queryParams = Object.entries(userInfo)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&');

        // Add 'name' to the queryParams
        const finalQueryParams = `${queryParams}&name=${encodeURIComponent(name)}`;

        // Redirect to another page and pass user information as query parameters
        window.location.href = `/display_info?${finalQueryParams}`;

      })
      .catch(function(error) {
        // Display specific error message received from the server
        const errorMessage = (error.error) || 'Failed to submit phone number. Please try again.';

        console.error('Error submitting phone number:', error);

        // Display an alert with the specific error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      });
  });
});