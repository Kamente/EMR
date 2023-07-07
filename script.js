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

// Fetch patient data from the API
fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        // Get the logged-in patient's ID from the URL query parameters
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const patientId = urlParams.get("patientId");

        // Find the logged-in patient in the data
        const patient = data.myHealthApi.patient.find(
            (patient) => patient.id === parseInt(patientId)
        );

        if (patient) {
            displayPatientInformation(patient);
        } else {
            alert("Invalid patient ID");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

function displayPatientInformation(patient) {
    // Get the necessary elements
    const patientNameElement = document.getElementById("patientName");
    const patientEmailElement = document.getElementById("patientEmail");
    const patientAgeElement = document.getElementById("patientAge");
    const patientPhoneElement = document.getElementById("patientPhone");
    const patientMedicalHistoryElement = document.getElementById("patientMedicalHistory");
    const patientAppointmentsElement = document.getElementById("patientAppointments");

    // Set the patient information in the elements
    patientNameElement.textContent = patient.name;
    patientEmailElement.textContent = "Email: " + patient.email;
    patientAgeElement.textContent = "Age: " + patient.age;
    patientPhoneElement.textContent = "Phone: " + patient.phone;
    patientMedicalHistoryElement.textContent =
        "Medical History: " + JSON.stringify(patient["Medical History"]);
    patientAppointmentsElement.textContent =
        "Appointments: " + JSON.stringify(patient.appointments);
}
