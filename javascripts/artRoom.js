let owner;
async function getData() {
    return await fetch('https://localhost:7212/api/Auth', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response => response.json()).then(body => {
        if (body != null) {
            console.log(body);
            const urlParams = new URLSearchParams(window.location.search);
            const variable = urlParams.get('id');
            if (body.roomsId != variable) {
                window.location.href = "/Showcase/";
            }
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
    console.log(user);
}

displayMessage();

async function getRoomData() {
    const urlParams = new URLSearchParams(window.location.search);
    const variable = urlParams.get('id');
    return await fetch('https://localhost:7212/api/ArtRoom/'+variable, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response => response.json()).then(body => {
        if (body != null) {
            console.log(body);
        } else {
            window.location.href = "/Showcase/";
        }
        return body;
    }).catch(error => {
        console.log("error");
        window.location.href = "/Showcase/";
    });

}
let room;
async function displayessage() {
    room = await getRoomData();
    console.log(room);
    for(let i = 0; i < room.userNames.length; i++){
        let currentUser = room.userNames[i];
        var div = document.createElement("div");
        var list = document.getElementById("list");
        var item = document.createElement("p");
        item.textContent = currentUser;
        div.appendChild(item);
        if(room.owner == user.id){
            var button = document.createElement("button");
            button.textContent = "kick";
            div.appendChild(button);
        }
        list.appendChild(div);
    }
}

displayessage();



const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7212/chathub")
    .configureLogging(signalR.LogLevel.Information)
    .build();
const urlParams = new URLSearchParams(window.location.search);
const variable = urlParams.get('id');
async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
        try {
            await connection.invoke("SendMessage", user.userName, variable);
        } catch (err) {
            console.error(err);
        }
        connection.on("ReceiveMessage", (user, message) => {

            if(variable != message) return;
            var list = document.getElementById("list");
            var item = document.createElement("p");
            item.textContent = user;
            list.appendChild(item);

        });

        connection.on("ReceiveChatMessage", (user, sended, message) => {

            if(variable != user) return;
            var list = document.getElementById("chat");
            var item = document.createElement("p");
            item.textContent = sended + ": "+ message;
            list.appendChild(item);
        });

    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.onclose(async () => {
    await start();
});

// Start the connection.
start();

document.getElementById('subm').addEventListener('click', async (event) => {
    event.preventDefault();
    await connection.invoke("SendChatMessage", variable, user.userName, document.getElementById("input").value);
    var input = document.getElementById('input');
    input.value ="";
});



