var email = document.getElementById("email");
var password = document.getElementById("password");

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    handleInlogForm(event);
});


async function hashPassword(password) {
    // Create a new instance of the SHA-256 hash function
    const sha256 = crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    
    // Convert the result to a hexadecimal string
    return sha256.then(buffer => {
        const hashArray = Array.from(new Uint8Array(buffer));
        const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashedPassword;
    });
}

 async function handleInlogForm(){
    var cryp = await hashPassword(document.getElementById("password").value);
    var data = {
        email: document.getElementById("email").value,
        password: cryp
    };

    fetch('https://localhost:7212/api/Inlog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.text();
    }).then(data => {
     console.log(data)
      if (data == "true") {
        window.location.href = "index";
      } else {
        alert("er is al een account met deze email of username");
      }
    })
    .catch(error => {
    
    });
}


