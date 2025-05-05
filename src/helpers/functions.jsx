import Swal from "sweetalert2";

export function errorAlert(title, message, icon) {
  Swal.fire({
    title: title,
    text: message,
    icon: icon,
  });
}

export function redirectAlert(redirect, title, message, icon, url) {
  let timerInterval;
  Swal.fire({
    title: title,
    html: message,
    timer: 2000,
    icon: icon,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
      redirect(url);
    },
  });
}

export function generateToken() {
  return (
    Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10)
  );
}
