
class CustomHeader extends HTMLElement {
    shadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({mode: 'open'});
        const p = document.createElement('p');
        p.innerHTML += 'toasty';
        this.shadowRoot.appendChild(p);

    }
}

customElements.define('custom-header', CustomHeader);
document.getElementById("toasty").addEventListener("click", showToasty);

async function removeCustomTitle(custom) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    custom.remove(); 
}

function showToasty(){ 
    const customHeader = new CustomHeader();
    document.body.appendChild(customHeader);
    removeCustomTitle(customHeader);
}



