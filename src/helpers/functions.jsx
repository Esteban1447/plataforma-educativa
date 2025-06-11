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
    timer: 750,
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

export function normalizeName(text) {
  return text
    .normalize("NFD")                     // Normalizar caracteres Unicode
    .replace(/[\u0300-\u036f]/g, "")     // Eliminar diacríticos
    .toLowerCase()                        // Convertir a minúsculas
    .replace(/^\w/, c => c.toUpperCase()) // Primera letra mayúscula
    .trim();                             // Eliminar espacios al inicio y final
}

export async function deleteUser(onDelete, userName) {
  const result = await Swal.fire({
    title: `¿Eliminar usuario${userName ? `: ${userName}` : ""}?`,
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    try {
      await onDelete();
      await Swal.fire({
        title: "Eliminado",
        text: "El usuario ha sido eliminado.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
        title: "Error al eliminar usuario",
        text: error?.message || "Ocurrió un error inesperado.",
        icon: "error",
      });
    }
  }
}
