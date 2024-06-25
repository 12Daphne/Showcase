async function getData(){
  return await fetch('https://localhost:7212/api/Auth', {
     method: 'GET',
     credentials: 'include',
     headers: {
       'Access-Control-Allow-Origin': '*' 
     }
   }).then(response => response.json()).then(body =>{
               if (body != null) {
               } else {
                 window.location.href = "/Showcase/Start.html";
               }
               return body;
             }).catch(error => {
                 console.log("error");
                 window.location.href = "/Showcase/Start.html";
             });
 
 }
 let user;
 async function displayMessage() {
   user = await getData();
   userId = user.id;
   ownerName = user.userName;
   document.getElementById("room").setAttribute("userId", user.id);
   console.log(user)
 }
 
 displayMessage();


 