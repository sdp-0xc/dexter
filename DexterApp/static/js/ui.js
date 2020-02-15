// buttons
const connect = document.getElementById('connect');
const upLeftBtn = document.getElementById('upLeft');
const upBtn = document.getElementById('up');
const upRightBtn = document.getElementById('upRight');
const leftBtn = document.getElementById('left');
const stopBtn = document.getElementById('stop');
const rightBtn = document.getElementById('right');
const downLeftBtn = document.getElementById('downLeft');
const downBtn = document.getElementById('down');
const downRightBtn = document.getElementById('downRight');

const xhttp = new XMLHttpRequest();

// Display available functionality when connection is established
connect.addEventListener('click', () => {
  const initialDisplay = document.getElementById('initialDisplay');
  const loading = document.getElementById('loading');

  // Adding d-none to classList hides element with its content
  initialDisplay.classList.add('d-none');

  // Removing d-none displays previously hidden element
  loading.classList.remove('d-none');

  // Spinner spins for 2 seconds to indicate loading
  // Then functionality is displayed
  setTimeout(() => {
    const manualControlBody = document.getElementById('manualControlBody');
    const navigation = document.getElementById('navigation');

    loading.classList.add('d-none');
    manualControlBody.classList.remove('d-none');
    navigation.classList.remove('d-none');
  }, 2000);
});

// Event Listeners for buttons in manual control
upLeftBtn.addEventListener('click', () => {
  sendCommand('up-left');
});

upBtn.addEventListener('click', () => {
  sendCommand('up');
});

upRightBtn.addEventListener('click', () => {
  sendCommand('up-right');
});

leftBtn.addEventListener('click', () => {
  sendCommand('left');
});

stopBtn.addEventListener('click', () => {
  sendCommand('stop');
});

rightBtn.addEventListener('click', () => {
  sendCommand('right');
});

downLeftBtn.addEventListener('click', () => {
  sendCommand('down-left');
});

downBtn.addEventListener('click', () => {
  sendCommand('down');
});

downRightBtn.addEventListener('click', () => {
  sendCommand('down-right');
});

//Event on pressing arrow keys
document.addEventListener('keydown', e => {
  let direction;
  switch (e.keyCode) {
    case 38:
      direction = 'up';
      break;
    case 40:
      direction = 'down';
      break;
    case 37:
      direction = 'left';
      break;
    case 39:
      direction = 'right';
      break;
  }

  if (direction) {
    sendCommand(direction);
  }
});

// Sends JSON object with 'command' field. 'command' is string that indicates direction of movement.
function sendCommand(direction) {
  // TO DO: ADD URL
  const url = '/send';

  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  const data = {
    command: direction
  };

  xhttp.send(JSON.stringify(data));
}
