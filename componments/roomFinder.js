class roomFinder extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
            .roomlist {
                width: 30%; /* Adjust width as needed */
                height: 500px; /* Adjust height as needed */
                overflow: auto;
                border: 1px solid #ccc;
            }

            h1{
                color : white;
            }
            </style>
            <div class="holder">
                <h1>Available Rooms</h1>
                <section class="roomlist" id="list"> 
                </section>
            </div>
        `;
    }

    connectedCallback() {
        const pane = this.shadowRoot.getElementById("list");
        fetch('https://localhost:7212/api/Room', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => response.json()).then(body => {
            if (body != null) {
                console.log(body);
                for(let i = 0; i < body.length; i++){
                    let currentRoom = body[i];
                    const Room = new room(currentRoom.roomName, currentRoom.ownerName, currentRoom.id, currentRoom.roomPassword);
                    pane.appendChild(Room);
                }
            } else {
                console.log("hey");
            }
            console.log("hey2")
            return body;
        }).catch(error => {

            console.log("error");
        });

    }
}

customElements.define('room-finder', roomFinder);