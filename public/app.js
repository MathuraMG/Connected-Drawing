let socket = io(); //opens and connects to the socket
//p5 variables
let r,g,b;
let shape;


//listen for confirmation
socket.on('connect', () =>{
  console.log('connected to the server via sockets')
})

//P5 code
function setup() {
  createCanvas(400, 400);
  background(220);
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);
  shape = floor(random(0,2));
  socket.on('mouseDataFromServer', (data)=> {
    drawEllipseWithData(data);
  })
  
}

//emit information of mouse positon everytime i move mouse
function mouseDragged() {
  let mousePos = 
  { x: round(mouseX), 
    y:round(mouseY),
    red:r,
    blue:b,
    green:g,
    shape: shape
  };
  //emit this information to the server
  socket.emit('mousePositionData', mousePos);
}

function drawEllipseWithData(data) {
  fill(data.red, data.blue, data.green);
  if(data.shape ==0) {
    ellipse(data.x, data.y, 20,20);
  } else {
    rect(data.x, data.y, 20,20);
  }
  
}



/**

- Add a disconnect function on the server so that you know when the sockets disconnect
- in the client side, write a function to draw on mouse dragged
- within the mouse drag function emit the mousePos information with the label mousePositionData
//emit information of mouse positon everytime i move mouse
function mouseDragged() {
  ellipse(mouseX, mouseY, 10,10);
  let mousePos = {x: mouseX, y:mouseY};
  //emit this information to the server
  socket.emit('mousePositionData', mousePos);
}
- in the server, get the information within the socket connections
//listen for a message from this client
  socket.on('mousePositionData', (data) => {
    console.log(data);
  })
- now, the server has to send this information to ALL the clients. this has to be done WITHIN the socket.oin in the server
io.sockets.emit('mouseDataFromServer', data);
- the client on reciving this data has to draw an ellipse
so within setup,
 socket.on('mouseDataFromServer', (data)=> {
    drawEllipseWithData(data);
  })

here is the function defn - 
function drawEllipseWithData(data) {
  fill(255,0,0);
  ellipse(data.x, data.y, 10,10);
}



 */