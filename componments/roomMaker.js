
function sendToRoom(id, ownrName){
    var data = {
        Id: id,
        Username: ownrName,
        Owner: true
    };

    fetch('https://localhost:7212/api/ArtRoom', {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
            
        },
        body: JSON.stringify(data)

    }).then(response => {
      console.log(response);
      if (response.ok) {
        window.location.href = "artRoom.html?id="+roomId2;
      } else {
        alert("invalid code");
      }

    }).catch(error => {

    });
}



class roomMaker extends HTMLElement {
    constructor(userId) {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const container = document.createElement('div');
        container.id = 'room';

        const heading = document.createElement('h2');
        heading.textContent = 'Create a Room';

        const form = document.createElement('form');
        form.id = "form";

        const labelName = document.createElement('label');
        labelName.textContent = "Room Name"

        const roomname = document.createElement('input');
        roomname.id = "code";
        roomname.type = Text;


        const labelPassword = document.createElement('label');
        labelPassword.textContent = "Password (Optional) "

        const password = document.createElement('input');
        password.id = "passw";
        password.type = Text;

        const button = document.createElement('button');
        button.id = "submit";
        button.type = "submit";

        button.textContent = 'Create room';

        const breaks = document.createElement('br');
        const break2 = document.createElement('br');
        const break3 = document.createElement('br');
        const break4 = document.createElement('br');

        const style = document.createElement('style');
        style.textContent = `
            button {
                display : block;
                margin-top: 2%;
                width: 20%
            }
            label {
                color : white;
                
            }

            h2 {
                color : white;
                font-size : 50px;
            }

            input {
                width: 20%
            }

        `;

        form.appendChild(labelName);
        form.appendChild(break3);
        form.appendChild(roomname);
        form.appendChild(breaks);
        form.appendChild(break2);
        form.appendChild(labelPassword);
        form.appendChild(break4);
        form.appendChild(password);
        form.appendChild(button);

        shadow.appendChild(style);
        container.appendChild(heading);
        container.appendChild(form);
        shadow.appendChild(container);

    }
    connectedCallback() {
        let roomName = this.shadowRoot.getElementById("code");

        roomName.addEventListener('input', function () {
            const Regex = /^[a-zA-Z]+$/;
            if (roomName.value.trim() == '' || !Regex.test(roomName.value)) {
                roomName.setCustomValidity('Only use letters for your room name');
                return;
            } else roomName.setCustomValidity('');
        });

        this.shadowRoot.getElementById('submit').addEventListener('click', (event) => {
            event.preventDefault();
            
            var data = {
                OwnerId : userId,
                OwnerName : ownerName,
                roomName : roomName.value,
                roomPassword : this.shadowRoot.getElementById("passw").value
            }
            if (roomName.value.trim() == '') return;

            fetch('https://localhost:7212/api/Room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(data)
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                if (data != null) {
                    sendToRoom(data.id, ownerName);
                    alert("ging goed")
                } else {
                    alert("Ging fout");
                }
            })
                .catch(error => {

                });

        });
    }

}
customElements.define('room-maker', roomMaker);
