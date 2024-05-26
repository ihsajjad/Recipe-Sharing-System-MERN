import Swal from "sweetalert2";

export const successToast = (message: string) => {
  return Swal.fire({
    position: "top-end",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const askingForPermission = (
  title: string,
  txt: string,
  confirmButtonText: string
) => {
  return Swal.fire({
    title: title,
    text: txt,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "var(--primary-color)",
    cancelButtonColor: "var(--secondary-color)",
    confirmButtonText: confirmButtonText,
  });
};
