
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", function(event) {
  
});

async function getData(){
 return await fetch('https://localhost:7212/api/Auth', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Origin': '*' 
    }
  }).then(response => response.json()).then(body =>{
              if (body != null) {
                console.log("hey");
                console.log(body.name)

              } else {
                console.log("hey");
                window.location.href = "/Showcase/Start.html";
              }
              console.log("hey2")
              return body;
            }).catch(error => {
                console.log("error");
                window.location.href = "/Showcase/Start.html";
            });

}
async function displayMessage() {
  let user = await getData();
  console.log(user);
  var message = document.getElementById("message");
  message.innerHTML = "Hey " + user.name;
}

displayMessage();


