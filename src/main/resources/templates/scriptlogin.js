// login.js

$(document).ready(function() {
    // Check URL parameters for error or logout messages
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
        $('#error-message').show();
    }
    if (urlParams.has('logout')) {
        $('#logout-message').show();
    }

    // Handle form submission
    $('#login-form').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const username = $('#username').val();
        const password = $('#password').val();

        if (!username || !password) {
            alert('Both username and password are required!');
            return;
        }

        // Perform AJAX login (assuming you have a backend endpoint to handle this)
        $.ajax({
            url: $(this).attr('action'),
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                // Handle successful login
                window.location.href = 'home.html'; // Redirect to home or another page upon success
            },
            error: function() {
                $('#error-message').show();
            }
        });
    });

    // Handle logout button click
    $('#logout-btn').on('click', function() {
        // Perform logout action (this may involve calling a logout endpoint)
        // Assuming logging out clears session or similar action
        // Redirect to the login page
        window.location.href = 'login.html'; // Adjust the URL to your actual login page
    });
});
