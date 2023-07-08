const apiUrl = "https://myhealthpatients.onrender.com/myHealthApi";

// Login Page
const loginForm = document.getElementById("LoginForm");
loginForm.addEventListener("submit", handleLogin);

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const matchedPatient = data.patients.find(
                (patient) => patient.email === email && patient.password === password
            );

            if (matchedPatient) {
                localStorage.setItem("loggedInPatient", JSON.stringify(matchedPatient));
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid email or password");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
