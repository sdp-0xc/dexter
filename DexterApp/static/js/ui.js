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
const manualControlBtnBig = document.getElementById('manualControlButtonBig');
const returnBtn = document.getElementById('returnBtn');
const returnBtnErase = document.getElementById('returnBtnErase');
const eraseBtn = document.getElementById('eraseButton');
const eraseBtnBig = document.getElementById('eraseButtonBig');
const eraseCircle = document.getElementById('eraseCircle');
const stopCircle = document.getElementById('stopCircle');

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
  eraseBody.classList.remove('d-md-block');
  eraseBody.classList.add('d-none');
  currentTab = 'menu';

  loading.classList.remove('d-none');

  // Return to initial screen
  setTimeout(() => {
    loading.classList.add('d-none');
    initialDisplay.classList.remove('d-none');
  }, 2000);
  
  // Return our program to initial state
  
  eraseCircle.classList.remove('d-none');
  stopCircle.classList.add('d-none');
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
  eraseBody.classList.remove('d-md-block');
  eraseBody.classList.add('d-none');
  currentTab = 'menu';

  loading.classList.remove('d-none');

  // Return to initial screen
  setTimeout(() => {
    loading.classList.add('d-none');
    initialDisplay.classList.remove('d-none');
  }, 2000);
  
  // Return our program to initial state
  
  eraseBtnBig.classList.remove("active");
  eraseBtnBig.classList.remove("text-light");
  manualControlBtnBig.classList.add("active");
  manualControlBtnBig.classList.add("text-light");
  eraseCircle.classList.remove('d-none');
  stopCircle.classList.add('d-none');
  
});

eraseBtnBig.addEventListener('click', () => {
	if (currentTab !== 'erase') {
	  currentTab = 'erase';
	  
      eraseBtnBig.classList.add("active");
	  eraseBtnBig.classList.add("text-light");
	  manualControlBtnBig.classList.remove("active");
	  manualControlBtnBig.classList.remove("text-light");
	  
	  eraseBody.classList.remove('d-none');
	  eraseBody.classList.add('d-md-block');
	  manualControlBody.classList.add('d-none');
	  manualControlBody.classList.remove('d-md-block');
	  
    }
});

manualControlBtnBig.addEventListener('click', () => {
	if (currentTab !== 'manualControl') {
	  currentTab = 'manualControl';
	  
      manualControlBtnBig.classList.add("active");
	  manualControlBtnBig.classList.add("text-light");
	  eraseBtnBig.classList.remove("active");
	  eraseBtnBig.classList.remove("text-light");
	  
	  manualControlBody.classList.remove('d-none');
	  manualControlBody.classList.add('d-md-block');
	  eraseBody.classList.add('d-none');
	  eraseBody.classList.remove('d-md-block');
	  
	  // If user opens a seperate functionality while dexter is
	  // cleaning the board, dexter should stop cleaning and
	  // await further instructions (should discuss further
	  // and most likely change this behaviour)
	  eraseCircle.classList.remove('d-none');
	  stopCircle.classList.add('d-none')
    }
});

returnBtn.addEventListener('click', () => {
	
  initialDisplay.parentElement.parentElement.classList.add('d-none');
  initialDisplay.parentElement.parentElement.classList.remove('d-flex');
  manualControlBody.classList.add('d-none');
  eraseBody.classList.add('d-none');
  mobileNav.classList.remove('d-none');
  currentTab = 'menu';
});

returnBtnErase.addEventListener('click', () => {
	
  currentTab = 'menu';
  initialDisplay.parentElement.parentElement.classList.add('d-none');
  initialDisplay.parentElement.parentElement.classList.remove('d-flex');
  manualControlBody.classList.add('d-none');
  eraseBody.classList.add('d-none');
  mobileNav.classList.remove('d-none');
  
  // If user opens a seperate functionality while dexter is
  // cleaning the board, dexter should stop cleaning and
  // await further instructions (should discuss further
  // and most likely change this behaviour)
  eraseCircle.classList.remove('d-none');
  stopCircle.classList.add('d-none')
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

eraseBtn.addEventListener('click', () => {
  // const cssMenu = document.getElementById('cssmenu');
  // cssMenu.classList.remove('d-none');
  mobileNav.classList.add('d-none');
  initialDisplay.parentElement.parentElement.classList.remove('d-none');
  initialDisplay.parentElement.parentElement.classList.add('d-flex');
  eraseBody.classList.remove('d-none');
  currentTab = 'erase';
});



window.addEventListener('resize', e => {
  const initialDisplay = document.getElementById('initialDisplay');
  const loading = document.getElementById('loading');
  const navigation = document.getElementById('navigation');
  if (
    window.innerWidth >= 768 &&
    initialDisplay.classList.contains('d-none') &&
    loading.classList.contains('d-none')
  ) 
  {
    navigation.classList.remove('d-none');
    initialDisplay.parentElement.parentElement.classList.remove('d-none');
    initialDisplay.parentElement.parentElement.classList.add('d-flex');
	if (currentTab === 'erase'){
	  eraseBtnBig.classList.add("active");
	  eraseBtnBig.classList.add("text-light");
	  manualControlBtnBig.classList.remove("active");
	  manualControlBtnBig.classList.remove("text-light");
	  
	  eraseBody.classList.remove('d-none');
	  eraseBody.classList.add('d-md-block');
	  manualControlBody.classList.add('d-none');
	  manualControlBody.classList.remove('d-md-block');
	}
	else if (currentTab === 'menu' || currentTab === 'manualControl'){
	  manualControlBtnBig.classList.add("active");
	  manualControlBtnBig.classList.add("text-light");
	  eraseBtnBig.classList.remove("active");
	  eraseBtnBig.classList.remove("text-light");
	  
	  manualControlBody.classList.remove('d-none');
	  manualControlBody.classList.add('d-md-block');
	  eraseBody.classList.add('d-none');
	  eraseBody.classList.remove('d-md-block');
	}
  } 
  else if (
    initialDisplay.classList.contains('d-none') &&
    loading.classList.contains('d-none')
  ) 
  {
	
    navigation.classList.add('d-none');
    if (currentTab === 'menu') 
	{
      mobileNav.classList.remove('d-none');
      initialDisplay.parentElement.parentElement.classList.remove('d-flex');
      initialDisplay.parentElement.parentElement.classList.add('d-none');
    } 
	else 
	{
      mobileNav.classList.add('d-none');
      initialDisplay.parentElement.parentElement.classList.remove('d-none');
      initialDisplay.parentElement.parentElement.classList.add('d-flex');
    }
  }
});

// Event Listeners for buttons in the erase section

eraseCircle.addEventListener('click', () => {
  eraseCircle.classList.add('d-none');
  stopCircle.classList.remove('d-none');
});

stopCircle.addEventListener('click', () => {
  eraseCircle.classList.remove('d-none');
  stopCircle.classList.add('d-none');
});

// Event Listeners for buttons in manual control
// Pressing a button "activates" manualControl 
// Mode, where resizing the interface won't throw
// the user back to menu
upLeftBtn.addEventListener('click', () => {
  currentTab = 'manualControl';
  sendCommand('up-left');
});

upBtn.addEventListener('click', () => {
  currentTab = 'manualControl';
  sendCommand('up');
});

upRightBtn.addEventListener('click', () => {
  currentTab = 'manualControl';
  sendCommand('up-right');
});

leftBtn.addEventListener('click', () => {
  currentTab = 'manualControl';
  sendCommand('left');
});

stopBtn.addEventListener('click', () => {
  currentTab = 'manualControl';
  sendCommand('stop');
});

rightBtn.addEventListener('click', () => {
  currentTab = 'manualControl';
  sendCommand('right');
});

downLeftBtn.addEventListener('click', () => {
  currentTab = 'manualControl';
  sendCommand('down-left');
});

downBtn.addEventListener('click', () => {
  currentTab = 'manualControl';
  sendCommand('down');
});

downRightBtn.addEventListener('click', () => {
  currentTab = 'manualControl';
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
