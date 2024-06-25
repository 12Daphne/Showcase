let roomId2;
let username;
class room extends HTMLElement {
    constructor(roomName, roomOwner, roomId, password) {
        super();
        roomId2 = roomId;
        username = roomOwner;

        console.log(roomId2);
        this.attachShadow({ mode: 'open' });
        const name = this.getAttribute('name');

        this.shadowRoot.innerHTML = `
            <style>
                .room {
                    font-size: 20px;
                    color: white;
                    border: 2px solid #000;
                    padding: 10px;
                }
                button{
                    width: 20%
                }
            </style>
            <div class="room">
            <section>
                <h1>${roomName} id: <span id="idroom">${roomId}</span></h1>
                <p>Hosted by: ${roomOwner}</
            </section>
            <section id="joining">
                <button id="join">Join</button>
            </section>
            </div>
        `;
    }

    connectedCallback() {
        let roomIds = this.shadowRoot.getElementById("idroom").textContent;
    
        this.shadowRoot.getElementById("join").addEventListener("click", function(){
            console.log(roomIds);

            var data = {
                Id: roomIds,
                Username: username,
                Owner: false
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
              if (response.ok) {
                window.location.href = "artRoom.html?id="+roomIds;
              } else {
                alert("invalid code");
              }

            }).catch(error => {

            });
          });
    }
}

customElements.define('room-comp', room);