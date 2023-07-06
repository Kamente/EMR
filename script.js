const apiUrl = "https://myhealthpatients.onrender.com/patients";

fetch(apiUrl)
    .then((resp) => {
        return resp.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error("Error:",error);
    });
