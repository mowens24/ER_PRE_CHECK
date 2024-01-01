document.addEventListener("DOMContentLoaded", function () {
  // Dark Mode Toggle
  var darkModeCheckbox = document.getElementById("dark-mode-toggle");
  if (darkModeCheckbox) {
    darkModeCheckbox.addEventListener("change", function () {
      document.body.classList.toggle("dark-mode");
    });
  }

  // Login Form Submission
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      // Implement authentication logic here
      // For demonstration, we'll just show an alert and redirect
      alert("Login successful for " + username);
      window.location.href = "loading.html";
    });
  }

  // Loading Screen Behavior
  if (window.location.pathname.includes("loading.html")) {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000); // 3 seconds delay
  }
});

document
  .getElementById("pre-checkin-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let symptoms = [];
    document
      .querySelectorAll('input[name="symptoms"]:checked')
      .forEach((checkbox) => {
        symptoms.push(checkbox.value);
      });
    if (document.getElementById("other").checked) {
      symptoms.push(document.getElementById("otherDetails").value);
    }

    fetch("http://localhost:3000/submit-symptoms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptoms }),
    })
      .then((response) => response.text())
      .then((data) => alert(data))
      .catch((error) => console.error("Error:", error));
  });
