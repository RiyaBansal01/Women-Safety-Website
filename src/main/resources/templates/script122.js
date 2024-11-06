    
    const ACCOUNT_SID = 'AC9ca1456f549bfb5a333c27d9fb376e5d';
    const AUTH_TOKEN = 'c9ae7ebe045d5b8102b3a001f79f6394';
    const TWILIO_PHONE_NUMBER = '+19713024078';// SOS Functionality
    // function sendSOS() {
    //     // Set up the parameters to pass to the EmailJS template
    //     const params = {
    //         to_email: 'sambhav9058@gmail.com',  // Replace with the actual recipient's email
    //         message: 'SOS alert! The user has pressed the SOS button!',
    //     };
    
    //     // Send the email using EmailJS
    //     emailjs.send('service_an57mpn', 'template_hd66jcq', params)
    //     .then(function(response) {
    //         alert('SOS Sent Successfully!');
    //         console.log('SUCCESS!', response.status, response.text); // Log success response
    //     }, function(error) {
    //         alert('Failed to send SOS.');
    //         console.error('FAILED...', error); // Log error if failed
    //     });
    // }
    function sendSOS(lat, lon) {
        const toPhoneNumber = '+919870602507'; // Replace with the recipient's phone number
        const message = `SOS Alert! Please take immediate action.`;
    
        // Twilio account details (replace with your own)
        const ACCOUNT_SID = 'AC9ca1456f549bfb5a333c27d9fb376e5d';
        const AUTH_TOKEN = 'c9ae7ebe045d5b8102b3a001f79f6394';
        const TWILIO_PHONE_NUMBER = '+19713024078';
    
        // Create a Basic Auth header
        const authHeader = 'Basic ' + btoa(`${ACCOUNT_SID}:${AUTH_TOKEN}`);
    
        fetch('https://api.twilio.com/2010-04-01/Accounts/' + ACCOUNT_SID + '/Messages.json', {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                To: toPhoneNumber,
                From: TWILIO_PHONE_NUMBER,
                Body: message
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.sid) {
                alert('SOS Sent Successfully!');
            } else {
                alert('Failed to send SOS.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send SOS. Please try again.');
        });
    }
    
    

    // Live Location Sharing
    let map;
let marker;

function initMap() {
    // Initialize the map with a default location
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 15
    });
    marker = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map: map
    });
}

function startLiveLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Update the map center and marker position
            const newPosition = new google.maps.LatLng(lat, lon);
            map.setCenter(newPosition);
            marker.setPosition(newPosition);

            document.getElementById('live-location').innerText = `Lat: ${lat}, Lon: ${lon}`;
        }, error => {
            alert('Error getting location: ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Initialize map on page load
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});


// Audio Recording
let audioContext, recorder, audioBlob;
const audioPlayback = document.getElementById('audioPlayback');

function startAudioRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Audio recording is not supported by this browser.');
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            recorder = new MediaRecorder(stream);
            recorder.ondataavailable = e => {
                audioBlob = e.data;
                audioPlayback.src = URL.createObjectURL(audioBlob);
            };
            recorder.start();
            alert('Audio recording started.');
        })
        .catch(err => {
            alert('Error accessing audio: ' + err.message);
        });
}

function stopAudioRecording() {
    if (recorder) {
        recorder.stop();
        alert('Audio recording stopped.');
    } else {
        alert('No recording in progress.');
    }
}

// Video Recording
let videoRecorder, videoBlob;
const videoPlayback = document.getElementById('videoPlayback');

function startVideoRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Video recording is not supported by this browser.');
        return;
    }

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            videoRecorder = new MediaRecorder(stream);
            videoRecorder.ondataavailable = e => {
                videoBlob = e.data;
                videoPlayback.src = URL.createObjectURL(videoBlob);
            };
            videoRecorder.start();
            alert('Video recording started.');
        })
        .catch(err => {
            alert('Error accessing video: ' + err.message);
        });
}

function stopVideoRecording() {
    if (videoRecorder) {
        videoRecorder.stop();
        alert('Video recording stopped.');
    } else {
        alert('No recording in progress.');
    }
}

// Voice Command Activation
// This is a simplified version; for real implementation, you would use a library or API for voice recognition
function activateVoiceCommand() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript.toLowerCase();
        if (command.includes('help')) {
            activatePanicMode();
        }
    };
    recognition.start();
}

// Panic Mode
function activatePanicMode() {
    alert('Panic mode activated!');
    // Implement actual panic mode functionality, e.g., sending alerts, triggering alarms
}

// Unusual Behavior Detection
function detectUnusualBehavior() {
    // Placeholder for actual detection logic
    alert('Monitoring for unusual behavior.');
    // Implement actual behavior monitoring logic
}

// Animation on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.animated-section');

    function checkVisibility() {
        const triggerBottom = window.innerHeight / 5 * 4;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
});

// Form Submission
document.getElementById('contactForm').addEventListener('submit', event => {
    event.preventDefault();
    alert('Message sent successfully!');
    // Implement actual form submission logic here
});

// Logout Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Select the logout button
    const logoutBtn = document.getElementById('logout');

    // Check if the logout button exists
    if (logoutBtn) {
        // Add event listener for the logout button
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default button behavior

            // Optional: Perform any logout-related actions here, like API calls

            // Redirect to the login page
            // window.location.href = 'templates/login.html';
            window.location.href = '/login';

        });
    } else {
        console.error('Logout button not found');
    }
    });