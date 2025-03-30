function jobList(){
    const btn = document.getElementById('job-container');
    btn.scrollIntoView({ behavior: 'smooth' });
}

function openForm() {
    document.getElementById("popup-form").style.display = "block";
}

document.getElementById('application-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission
    
    // Show success alert
    alert('Your application has been submitted successfully!');

    
    // Optionally, clear the form fields
    document.getElementById('application-form').reset();

    closeForm();
    
    // Redirect to the homepage (or any page you want)
    window.location.href = '/';  // '/' is the homepage, adjust if needed
});

// Close the popup form function
function closeForm() {
    document.getElementById('popup-form').style.display = 'none';
}
