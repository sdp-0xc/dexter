// buttons
const connect = document.getElementById('connect');
const disconnect = document.getElementById('disconnect');
const disconnectLG = document.getElementById('disconnectLG');
const upLeftBtn = document.getElementById('upLeft');
const upBtn = document.getElementById('up');
const upRightBtn = document.getElementById('upRight');
const leftBtn = document.getElementById('left');
const stopBtn = document.getElementById('stop');
const rightBtn = document.getElementById('right');
const downLeftBtn = document.getElementById('downLeft');
const downBtn = document.getElementById('down');
const downRightBtn = document.getElementById('downRight');
const manualControlBtn = document.getElementById('manualControlButton');
const retrunBtn = document.getElementById('returnBtn');
let currentTab = 'menu';

const xhttp = new XMLHttpRequest();

// Display available functionality when connection is established
connect.addEventListener('click', () => {
  startConnection();
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
    const mobileNav = document.getElementById('mobileNav');

    loading.classList.add('d-none');
    manualControlBody.classList.add('d-md-block');
    mobileNav.classList.remove('d-none');
    mobileNav.classList.add('d-md-none');

    if (window.innerWidth >= 768) {
      const navigation = document.getElementById('navigation');
      navigation.classList.remove('d-none');
    } else {
      initialDisplay.parentElement.parentElement.classList.remove('d-flex');
      initialDisplay.parentElement.parentElement.classList.add('d-none');
    }
  }, 2000);
});

// Disconnect via button in mobile menu
disconnect.addEventListener('click', () => {
  endConnection();
  const initialDisplay = document.getElementById('initialDisplay');
  const loading = document.getElementById('loading');
  const mobileNav = document.getElementById('mobileNav');
  const manualControlBody = document.getElementById('manualControlBody');

  mobileNav.classList.add('d-none');
  initialDisplay.parentElement.parentElement.classList.remove('d-none');
  initialDisplay.parentElement.parentElement.classList.add('d-flex');
  manualControlBody.classList.remove('d-md-block');
  manualControlBody.classList.add('d-none');
  currentTab = 'menu';

  loading.classList.remove('d-none');

  // Return to initial screen
  setTimeout(() => {
    loading.classList.add('d-none');
    initialDisplay.classList.remove('d-none');
  }, 2000);
});

disconnectLG.addEventListener('click', () => {
  endConnection();
  const initialDisplay = document.getElementById('initialDisplay');
  const loading = document.getElementById('loading');
  const navigation = document.getElementById('navigation');
  const manualControlBody = document.getElementById('manualControlBody');
  const mobileNav = document.getElementById('mobileNav');

  mobileNav.classList.add('d-none');
  navigation.classList.add('d-none');
  manualControlBody.classList.remove('d-md-block');
  manualControlBody.classList.add('d-none');
  currentTab = 'menu';

  loading.classList.remove('d-none');

  // Return to initial screen
  setTimeout(() => {
    loading.classList.add('d-none');
    initialDisplay.classList.remove('d-none');
  }, 2000);
});

retrunBtn.addEventListener('click', () => {
  initialDisplay.parentElement.parentElement.classList.add('d-none');
  initialDisplay.parentElement.parentElement.classList.remove('d-flex');
  manualControlBody.classList.add('d-none');
  mobileNav.classList.remove('d-none');
  currentTab = 'menu';
});

manualControlBtn.addEventListener('click', () => {
  // const cssMenu = document.getElementById('cssmenu');
  // cssMenu.classList.remove('d-none');
  mobileNav.classList.add('d-none');
  initialDisplay.parentElement.parentElement.classList.remove('d-none');
  initialDisplay.parentElement.parentElement.classList.add('d-flex');
  manualControlBody.classList.remove('d-none');
  currentTab = 'manualControl';
});

window.addEventListener('resize', e => {
  const initialDisplay = document.getElementById('initialDisplay');
  const loading = document.getElementById('loading');
  const navigation = document.getElementById('navigation');
  if (
    window.innerWidth >= 768 &&
    initialDisplay.classList.contains('d-none') &&
    loading.classList.contains('d-none')
  ) {
    navigation.classList.remove('d-none');
    initialDisplay.parentElement.parentElement.classList.remove('d-none');
    initialDisplay.parentElement.parentElement.classList.add('d-flex');
  } else if (
    initialDisplay.classList.contains('d-none') &&
    loading.classList.contains('d-none')
  ) {
    navigation.classList.add('d-none');
    if (currentTab === 'menu') {
      mobileNav.classList.remove('d-none');
      initialDisplay.parentElement.parentElement.classList.remove('d-flex');
      initialDisplay.parentElement.parentElement.classList.add('d-none');
    } else {
      mobileNav.classList.add('d-none');
      initialDisplay.parentElement.parentElement.classList.remove('d-none');
      initialDisplay.parentElement.parentElement.classList.add('d-flex');
    }
  }
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

function startConnection() {
  const url = '/connect';

  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  const data = {
    command: 'connect'
  };
  xhttp.send(JSON.stringify(data));
}

function endConnection() {
  const url = '/disconnect';

  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  const data = {
    command: 'disconnect'
  };
  xhttp.send(JSON.stringify(data));
}

// Sends JSON object with 'command' field. 'command' is string that indicates direction of movement.
function sendCommand(direction) {
  const url = '/send';

  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  const data = {
    command: direction
  };
  xhttp.send(JSON.stringify(data));
}

function startConnection() {
  const url = '/connect';

  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  const data = {
    command: "connect"
  };
  xhttp.send(JSON.stringify(data));
}

$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
