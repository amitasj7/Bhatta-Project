import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing default styles

// Function to show toast notification
export const showToast = (message, type = "success") => {
  // Define the common options for the toast
  const options = {
    position: "top-right",
    autoClose: 2000, // Time in milliseconds before the toast closes
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce, // Correctly use the Bounce transition component
  };

  // Call toast based on the type passed ('success', 'error', 'info', etc.)
  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    default:
      toast.success(message, options); // Default to success if no type is passed
  }
};

// ToastContainer component
export const ToastNotification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000} // Time in milliseconds
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce} // Correctly use the Bounce transition component
    />
  );
};
