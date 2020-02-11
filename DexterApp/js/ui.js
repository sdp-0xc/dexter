// Connect buttone on initial page
const connect = document.getElementById('connect');

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
