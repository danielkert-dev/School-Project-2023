window.API = "http://localhost:8000";
function login() {
  let username = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;

  fetch(`${window.API}/user/auth/${username}/${password}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        document.querySelector(".response").innerHTML = "Login failed";
        document.querySelector(".response").style.color = "red";
      }
    })
    .then((data) => {
      document.querySelector(".response").innerHTML = data.message;
      document.querySelector(".response").style.color = "green";
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        const myHeaders = new Headers();
        console.log(localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("token"));
      
        fetch(`${window.API}/user/298`, {
          method: "GET",
          headers: myHeaders,
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      },1000)
      
    });

}
