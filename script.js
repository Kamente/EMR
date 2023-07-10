
document.getElementById('LoginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const enteredEmail = document.getElementById('emailInput').value;
    const enteredPassword = document.getElementById('passwordInput').value;

    fetch('https://myhealthpatients.onrender.com/myHealthApi')
        .then(response => response.json())
        .then(data => {

            const user = data.patients.find(patient => patient.email === enteredEmail && patient.password === enteredPassword);

            if (user) {

                localStorage.setItem('loggedInUser', JSON.stringify(user));


                window.location.href = 'dashboard.html';
            } else {

                console.log("Invalid email or password. Please try again.");
            }
        })
        .catch(error => {
            console.log("An error occurred while fetching data from the API:", error);
        });
});


const user = JSON.parse(localStorage.getItem('loggedInUser'));

if (user) {
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileAge').textContent = user.age;
    document.getElementById('profilePhone').textContent = user.phone;

    const medicalHistoryList = document.getElementById('medicalHistoryList');
    user["Medical History"].forEach(history => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Condition:</strong> ${history.condition}<br>
                          <strong>Diagnosis:</strong> ${history.diagnosis}<br>
                          <strong>Treatment:</strong> ${Array.isArray(history.treatment) ? history.treatment.join(", ") : history.treatment}`;
        medicalHistoryList.appendChild(listItem);
    });

    const appointmentsList = document.getElementById('appointmentsList');
    user.appointments.forEach(appointment => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Date:</strong> ${appointment.date}<br>
                          <strong>Time:</strong> ${appointment.time}<br>
                          <strong>Doctor:</strong> ${appointment.doctor}<br>
                          <strong>Hospital:</strong> ${appointment.Hospital}`;
        appointmentsList.appendChild(listItem);
    });
} else {
    window.location.href = 'login.html';
}
