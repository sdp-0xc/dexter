// buttons
const connect = document.getElementById('connect');
const disconnect = document.getElementById('disconnect');
const disconnectTab = document.getElementById('disconnectTab');
const retrunBtn = document.getElementById('returnBtn');
const manualControlBtn = document.getElementById('manualControlButton');
const manualControlTab = document.getElementById('manualControlTab');
const photoTab = document.getElementById('photoTab');
const photoBtn = document.getElementById('photoBtn');
const upLeftBtn = document.getElementById('upLeft');
const upBtn = document.getElementById('up');
const upRightBtn = document.getElementById('upRight');
const leftBtn = document.getElementById('left');
const stopBtn = document.getElementById('stop');
const rightBtn = document.getElementById('right');
const downLeftBtn = document.getElementById('downLeft');
const downBtn = document.getElementById('down');
const downRightBtn = document.getElementById('downRight');
const takePhoto = document.getElementById('takePhoto');
const emailInput = document.getElementById('emailInput');
const sendBtn = document.getElementById('sendBtn');
let currentTab = 'menu';
const testing = true;

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

  setTimeout(() => {
    loading.classList.add('d-none');
    if (xhttp.responseText === 'connect' || testing === true) {
      const correct = document.getElementById('correct');

      correct.classList.remove('d-none');
      setTimeout(() => {
        const manualControlBody = document.getElementById('manualControlBody');
        const mobileNav = document.getElementById('mobileNav');

        correct.classList.add('d-none');
        manualControlBody.classList.add('d-md-block');
        mobileNav.classList.remove('d-none');
        mobileNav.classList.add('d-md-none');
        retrunBtn.parentElement.classList.remove('d-none');
        retrunBtn.parentElement.classList.add('d-md-none');

        if (window.innerWidth >= 768) {
          const navigation = document.getElementById('navigation');
          navigation.classList.remove('d-none');
        } else {
          initialDisplay.parentElement.parentElement.classList.remove('d-flex');
          initialDisplay.parentElement.parentElement.classList.add('d-none');
        }
      }, 1000);
    } else {
      const incorrect = document.getElementById('incorrect');

      incorrect.classList.remove('d-none');
      setTimeout(() => {
        incorrect.classList.add('d-none');
        initialDisplay.classList.remove('d-none');
      }, 1000);
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
  photoBody.classList.add('d-none');
  retrunBtn.parentElement.classList.remove('d-md-none');
  retrunBtn.parentElement.classList.add('d-none');
  manualControlTab.classList.add('active');
  manualControlTab.classList.add('text-light');
  photoTab.classList.remove('active');
  photoTab.classList.remove('text-light');
  $('[data-toggle="tooltip"]').tooltip('hide');
  currentTab = 'menu';

  loading.classList.remove('d-none');

  // Return to initial screen
  setTimeout(() => {
    loading.classList.add('d-none');
    initialDisplay.classList.remove('d-none');
  }, 2000);
});

disconnectTab.addEventListener('click', () => {
  endConnection();
  const initialDisplay = document.getElementById('initialDisplay');
  const loading = document.getElementById('loading');
  const navigation = document.getElementById('navigation');
  const manualControlBody = document.getElementById('manualControlBody');
  const mobileNav = document.getElementById('mobileNav');
  const photoBody = document.getElementById('photoBody');

  mobileNav.classList.add('d-none');
  navigation.classList.add('d-none');
  manualControlBody.classList.remove('d-md-block');
  manualControlBody.classList.add('d-none');
  photoBody.classList.add('d-none');
  retrunBtn.parentElement.classList.remove('d-md-none');
  retrunBtn.parentElement.classList.add('d-none');
  manualControlTab.classList.add('active');
  manualControlTab.classList.add('text-light');
  photoTab.classList.remove('active');
  photoTab.classList.remove('text-light');
  $('[data-toggle="tooltip"]').tooltip('hide');
  currentTab = 'menu';

  loading.classList.remove('d-none');

  // Return to initial screen
  setTimeout(() => {
    loading.classList.add('d-none');
    initialDisplay.classList.remove('d-none');
  }, 2000);
});

retrunBtn.addEventListener('click', () => {
  const initialDisplay = document.getElementById('initialDisplay');
  const manualControlBody = document.getElementById('manualControlBody');
  const mobileNav = document.getElementById('mobileNav');
  const photoBody = document.getElementById('photoBody');

  initialDisplay.parentElement.parentElement.classList.add('d-none');
  initialDisplay.parentElement.parentElement.classList.remove('d-flex');
  manualControlBody.classList.add('d-none');
  photoBody.classList.add('d-none');
  mobileNav.classList.remove('d-none');
  manualControlTab.classList.add('active');
  manualControlTab.classList.add('text-light');
  photoTab.classList.remove('active');
  photoTab.classList.remove('text-light');
  retrunBtn.parentElement.classList.remove('mt-5');
  currentTab = 'menu';
});

manualControlBtn.addEventListener('click', () => {
  const initialDisplay = document.getElementById('initialDisplay');
  const manualControlBody = document.getElementById('manualControlBody');
  const mobileNav = document.getElementById('mobileNav');

  mobileNav.classList.add('d-none');
  initialDisplay.parentElement.parentElement.classList.remove('d-none');
  initialDisplay.parentElement.parentElement.classList.add('d-flex');
  manualControlBody.classList.remove('d-none');
  manualControlTab.classList.add('active');
  manualControlTab.classList.add('text-light');
  photoTab.classList.remove('active');
  photoTab.classList.remove('text-light');
  $('[data-toggle="tooltip"]').tooltip('hide');
  currentTab = 'manualControl';
});

manualControlTab.addEventListener('click', () => {
  const initialDisplay = document.getElementById('initialDisplay');
  const manualControlBody = document.getElementById('manualControlBody');
  const mobileNav = document.getElementById('mobileNav');
  const photoBody = document.getElementById('photoBody');

  mobileNav.classList.add('d-none');
  photoBody.classList.add('d-none');
  initialDisplay.parentElement.parentElement.classList.remove('d-none');
  initialDisplay.parentElement.parentElement.classList.add('d-flex');
  manualControlBody.classList.remove('d-none');
  manualControlTab.classList.add('active');
  manualControlTab.classList.add('text-light');
  photoTab.classList.remove('active');
  photoTab.classList.remove('text-light');
  $('[data-toggle="tooltip"]').tooltip('hide');
  currentTab = 'manualControl';
});

photoBtn.addEventListener('click', () => {
  const photoBody = document.getElementById('photoBody');
  const initialDisplay = document.getElementById('initialDisplay');
  const manualControlBody = document.getElementById('manualControlBody');
  const mobileNav = document.getElementById('mobileNav');

  mobileNav.classList.add('d-none');
  initialDisplay.parentElement.parentElement.classList.remove('d-none');
  initialDisplay.parentElement.parentElement.classList.add('d-flex');
  manualControlBody.classList.add('d-none');
  photoBody.classList.remove('d-none');
  manualControlTab.classList.remove('active');
  manualControlTab.classList.remove('text-light');
  photoTab.classList.add('active');
  photoTab.classList.add('text-light');
  retrunBtn.parentElement.classList.add('mt-5');
  $('[data-toggle="tooltip"]').tooltip('hide');
  currentTab = 'photo';
});

photoTab.addEventListener('click', () => {
  const photoBody = document.getElementById('photoBody');
  const initialDisplay = document.getElementById('initialDisplay');
  const manualControlBody = document.getElementById('manualControlBody');
  const mobileNav = document.getElementById('mobileNav');

  mobileNav.classList.add('d-none');
  initialDisplay.parentElement.parentElement.classList.remove('d-none');
  initialDisplay.parentElement.parentElement.classList.add('d-flex');
  manualControlBody.classList.add('d-none');
  manualControlBody.classList.remove('d-md-block');
  photoBody.classList.remove('d-none');
  manualControlTab.classList.remove('active');
  manualControlTab.classList.remove('text-light');
  photoTab.classList.add('active');
  photoTab.classList.add('text-light');
  $('[data-toggle="tooltip"]').tooltip('hide');
  currentTab = 'photo';
});

window.addEventListener('resize', () => {
  const initialDisplay = document.getElementById('initialDisplay');
  const loading = document.getElementById('loading');
  const navigation = document.getElementById('navigation');
  const manualControlBody = document.getElementById('manualControlBody');
  const photoBody = document.getElementById('photoBody');

  $('[data-toggle="tooltip"]').tooltip('hide');
  if (
    window.innerWidth >= 768 &&
    initialDisplay.classList.contains('d-none') &&
    loading.classList.contains('d-none')
  ) {
    navigation.classList.remove('d-none');
    initialDisplay.parentElement.parentElement.classList.remove('d-none');
    initialDisplay.parentElement.parentElement.classList.add('d-flex');
    if (currentTab === 'menu' || currentTab === 'manualControl') {
      manualControlBody.classList.remove('d-none');
      manualControlBody.classList.add('d-md-block');
      photoBody.classList.add('d-none');
    } else if (currentTab === 'photo') {
      manualControlBody.classList.add('d-none');
      manualControlBody.classList.remove('d-md-block');
      photoBody.classList.remove('d-none');
      retrunBtn.parentElement.classList.remove('mt-5');
    }
  } else if (
    initialDisplay.classList.contains('d-none') &&
    loading.classList.contains('d-none')
  ) {
    navigation.classList.add('d-none');
    if (currentTab === 'menu') {
      mobileNav.classList.remove('d-none');
      initialDisplay.parentElement.parentElement.classList.remove('d-flex');
      initialDisplay.parentElement.parentElement.classList.add('d-none');
    } else if (currentTab === 'manualControl') {
      mobileNav.classList.add('d-none');
      initialDisplay.parentElement.parentElement.classList.remove('d-none');
      initialDisplay.parentElement.parentElement.classList.add('d-flex');
      manualControlBody.classList.remove('d-none');
      manualControlBody.classList.add('d-md-block');
      photoBody.classList.add('d-none');
    } else if (currentTab === 'photo') {
      mobileNav.classList.add('d-none');
      initialDisplay.parentElement.parentElement.classList.remove('d-none');
      initialDisplay.parentElement.parentElement.classList.add('d-flex');
      manualControlBody.classList.add('d-none');
      manualControlBody.classList.remove('d-md-block');
      photoBody.classList.remove('d-none');
      retrunBtn.parentElement.classList.add('mt-5');
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

emailInput.addEventListener('input', () => {
  if (validateEmail(emailInput.value)) {
    sendBtn.classList.remove('disabled');
    sendBtn.classList.remove('btn-primary');
    emailInput.classList.remove('is-invalid');
    sendBtn.classList.add('btn-outline-primary');
    emailInput.classList.add('is-valid');
  } else {
    sendBtn.classList.add('disabled');
    sendBtn.classList.remove('btn-outline-primary');
    emailInput.classList.remove('is-valid');
    sendBtn.classList.add('btn-primary');
    emailInput.classList.add('is-invalid');
  }
});

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return false;
  }
}

takePhoto.addEventListener('click', () => {
  xhttp.open('GET', '/photo', true);
  xhttp.send();
  xhttp.onreadystatechange = () => {
    const snapshot = document.getElementById('snapshot');

    snapshot.src = xhttp.responseText;
  };
});

sendBtn.addEventListener('click', () => {
  const image = document
    .getElementById('snapshot')
    .src.replace('http://127.0.0.1:5000/', '');

  xhttp.open('POST', '/email', true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  const data = {
    command: 'email',
    img: image,
    email: emailInput.value
  };
  xhttp.send(JSON.stringify(data));
});

$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
