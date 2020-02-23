// buttons
const connect = document.getElementById('connect');
const disconnect = document.getElementById('disconnect');
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
    const mobileNav = document.getElementById('mobileNav');

    loading.classList.add('d-none');
    manualControlBody.classList.add('d-md-block');
    mobileNav.classList.remove('d-none');
    mobileNav.classList.add('d-md-none');

    if (window.innerWidth >= 768) {
      const navigation = document.getElementById('navigation');
      navigation.classList.remove('d-none');
    }
  }, 2000);
});

disconnect.addEventListener('click', () => {
  const initialDisplay = document.getElementById('initialDisplay');
  const loading = document.getElementById('loading');

  // Adding d-none to classList hides element with its content
  mobileNav.classList.add('d-none');

  // Removing d-none displays previously hidden element
  loading.classList.remove('d-none');


  // Spinner spins for 2 seconds to indicate loading
  // Then functionality is displayed
  setTimeout(() => {
    loading.classList.add('d-none');
    initialDisplay.classList.remove('d-none');
    if (window.innerWidth >= 768) {
      const navigation = document.getElementById('navigation');
      navigation.classList.remove('d-none');
    }
  }, 2000);
  
});

manualControlBtn.addEventListener('click', () => {	
		if (window.innerWidth < 768 ) {
			mobileNav.classList.add('d-none');
			manualControlBody.classList.remove('d-none');
			const cssMenu = document.getElementById('cssmenu');
			cssMenu.classList.remove('d-none');
		}
	}	
);

window.addEventListener('resize', () => {
  const initialDisplay = document.getElementById('initialDisplay');
  const navigation = document.getElementById('navigation');
  if (window.innerWidth >= 768 && initialDisplay.classList.contains('d-none')) {
    navigation.classList.remove('d-none');
    initialDisplay.parentElement.parentElement.classList.remove('d-none');
    initialDisplay.parentElement.parentElement.classList.add('d-flex');
  } else if (initialDisplay.classList.contains('d-none')) {
    navigation.classList.add('d-none');
    initialDisplay.parentElement.parentElement.classList.remove('d-flex');
    initialDisplay.parentElement.parentElement.classList.add('d-none');
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

// Sends JSON object with 'command' field. 'command' is string that indicates direction of movement.
function sendCommand(direction) {
  // TO DO: ADD URL
  const url = '';

  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  const data = {
    command: direction
  };

  xhttp.send(JSON.stringify(data));
}
