const apiUrl = "https://myhealthpatients.onrender.com/myHealthApi";

const signUpForm = document.querySelector("form");
signUpForm.addEventListener("submit", handleSignUp);

function handleSignUp(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmpass");

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;


    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const newUser = {
        email,
        password
    };


    fetch(`${apiUrl}/myHealthApi/patient`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .then(data => {
            alert("User registration successful");
            window.location.href = "./login.html";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred during registration");
        });
}
