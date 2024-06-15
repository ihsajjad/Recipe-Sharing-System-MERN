import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";
import { storage } from "../firebase/firebase.config";

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

export const uploadFile = async (file: File, filePath: string) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "pdf", "doc", "docx"];
  let err = "";
  let url = "";

  const fileExt = file.name.split(".")[1];
  console.log(filePath, fileExt);
  const isValidFile = allowedExtensions.includes(fileExt);

  if (!isValidFile) {
    err = `Allowed file extensions ${allowedExtensions.toString()}`;
    return { error: true, message: err };
  }

  const fileRef = ref(storage, filePath); // firebase storage to store license img
  //  // Uploading the file image to storage
  const fileTask = await uploadBytesResumable(fileRef, file);

  // Get the download URL
  const photoURL = await getDownloadURL(fileTask.ref);

  if (photoURL) {
    url = photoURL + ".doc";
  }

  console.log(url);

  return { error: false, url };
};

export const loadFile = async (filePath: string) => {
  const fileRef = ref(storage, filePath);

  const downloadURL = await getDownloadURL(fileRef);

  return downloadURL;
};
