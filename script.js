const apiUrl = "http://localhost:3000/myHealthApi";

// const submit = document.getElementById("submit");
// submit.addEventListener("click", () => {
//     alert("Submitted");
// });


// Login Page
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", handleLogin);

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const matchedPatient = data.myHealthApi.patients.find(
                (patient) => patient.email === email && patient.password === password
            );

            if (matchedPatient) {
                window.location.href = `dashboard.html?patientId=${matchedPatient.id}`;
            } else {
                alert("Invalid email or password");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// Dashboard Page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const patientId = urlParams.get("patientId");

fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        const patient = data.myHealthApi.patients.find(
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
    const patientDataElement = document.getElementById("patientData");

    const patientCard = document.createElement("div");
    patientCard.classList.add("patient-card");

    const patientName = document.createElement("h2");
    patientName.textContent = patient.name;

    const patientEmail = document.createElement("p");
    patientEmail.textContent = "Email: " + patient.email;

    const patientAge = document.createElement("p");
    patientAge.textContent = "Age: " + patient.age;

    const patientPhone = document.createElement("p");
    patientPhone.textContent = "Phone: " + patient.phone;

    const patientMedicalHistory = document.createElement("p");
    patientMedicalHistory.textContent =
        "Medical History: " + JSON.stringify(patient["Medical History"]);

    const patientAppointments = document.createElement("p");
    patientAppointments.textContent =
        "Appointments: " + JSON.stringify(patient.appointments);

    patientCard.appendChild(patientName);
    patientCard.appendChild(patientEmail);
    patientCard.appendChild(patientAge);
    patientCard.appendChild(patientPhone);
    patientCard.appendChild(patientMedicalHistory);
    patientCard.appendChild(patientAppointments);

    patientDataElement.appendChild(patientCard);
}
