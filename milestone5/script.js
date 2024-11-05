// Get references to the form and display area
var form = document.getElementById('resumeForm'); // Updated to match HTML ID
var resumeDisplayElement = document.getElementById('resumeDisplay');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link'); // Updated to match HTML ID
var downloadPDFButton = document.getElementById('download-pdf');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Save form data in localStorage with the username as the key
    var resumeData = { name: name, email: email, phone: phone, education: education, experience: experience, skills: skills };
    localStorage.setItem(username, JSON.stringify(resumeData));
    // Generate the resume content dynamically
    var resumeHTML = "\n        <h2>Editable Resume</h2>\n        <h3>Personal Information</h3>\n        <p><strong>Name:</strong> ".concat(name, "</p>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Phone:</strong> ").concat(phone, "</p>\n        <p><strong>Education:</strong> ").concat(education, "</p>\n        <p><strong>Experience:</strong> ").concat(experience, "</p>\n        <p><strong>Skills:</strong> ").concat(skills, "</p>\n    ");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPDFButton.addEventListener('click', function () {
    window.print();
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
