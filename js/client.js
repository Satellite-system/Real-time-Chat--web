const socket = io('http://localhost:8000');

const form = document.querySelector(".send-container");
const msgInp = document.getElementById("msgInp");
const msgContainer = document.querySelector(".container");


// Funtion to add msg to the Container 
const append = (msg, pos)=>{
        const msgElement = document.createElement('div');
        msgElement.innerText = msg;
        msgElement.classList.add('message');
        msgElement.classList.add(pos);
        msgContainer.append(msgElement);
};

// Pop up a prompt box to take user-Name 
const Name = prompt("Enter your name to join: ");
socket.emit('new-user-joined', Name)

// When a new User is Joinned 
socket.on('user joined',name =>{
    append(`${name} joined the Chat`,'center1');
});

//When form is submitted/ send btn is clicked
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = msgInp.value;
    if(message!=""){
        append(message,'right');
        socket.emit('send',message);
        msgInp.value = '';
    }else{
        alert("Empty Message could not be send!!");
    }
});

// When a Msg is Send 
socket.on('receive',data =>{
    append(`${data.name} => ${data.message}`,'left');
});

// When any User left the Chat-web 
socket.on('left',name =>{
    append(`${name} left the Chat`,'center2');
});


