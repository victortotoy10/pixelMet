let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById('formTitle').innerText = isLogin ? 'Login' : 'Register';
  document.getElementById('actionBtn').innerText = isLogin ? 'Enter' : 'Register';
  document.querySelector('.toggle').innerText = isLogin
    ? '¿NO TIENES CUENTA? REGISTRATE?'
    : '¿YA TIENES CUENTA? INICIA SESION?';
}

function handleAction() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert("Por favor completa ambos campos.");
    return;
  }

  alert((isLogin ? 'Iniciando sesión' : 'Registrando') + ' con: ' + username);
}

const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const lockIcon = document.getElementById('lockIcon');
let passwordVisible = false;

togglePassword.addEventListener('click', () => {
  passwordVisible = !passwordVisible;
  passwordInput.type = passwordVisible ? 'text' : 'password';

  togglePassword.src = passwordVisible
    ? './imagenes/ojo.svg'
    : './imagenes/ojo-cerrado.svg';

  lockIcon.src = passwordVisible
    ? './imagenes/candado-abierto.svg'
    : './imagenes/candado-cerrado.svg';
});
