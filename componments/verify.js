
class verify extends HTMLElement{
    
    constructor(email) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const container = document.createElement('div');
    container.id = 'popup';

    const heading = document.createElement('h2');
    heading.textContent = 'Verification';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'A email has been sended please enter the code below.';

    const input = document.createElement('input');
    input.id = "code";
    input.type = Number;
    const button = document.createElement('button');
    button.id = "submit";

    const close = document.createElement('button');
    close.id = "close";
    close.textContent = 'close';

    button.textContent = 'Verify Email';

    const style = document.createElement('style');
    style.textContent = `
      #popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
        z-index: 1000;
      }

      popup h2 {
        margin-top: 0;
      }

      popup button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 5px;
      }

      popup button:hover {
        background-color: #0056b3;
      }
    `;
    
    shadow.appendChild(style);
    container.appendChild(heading);
    container.appendChild(paragraph);
    container.appendChild(close);
    container.appendChild(button);
    container.appendChild(input);
    shadow.appendChild(container);
    }
    connectedCallback() {

        this.shadowRoot.getElementById('submit').addEventListener('click', () => {
            var data = {
                email: JSON.stringify(email.value),
                codecode: parseInt(this.shadowRoot.getElementById("code").value)
            };
        
            fetch('https://localhost:7212/api/VerificatieCheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*'
                },
                body: JSON.stringify(data)

            }).then(response => {
                return response.text();

            }).then(data => {
              console.log(data);
              if (data != "Wrong") {
                console.log("data");
                localStorage.setItem('token', data);
                window.location.href = /Showcase/;
              } else {
                alert("invalid code");
              }

            })
            .catch(error => {

            });
          });

          this.shadowRoot.getElementById('close').addEventListener('click', () => {
            this.remove();
          });
    }
}

customElements.define('verify-email', verify);