import { useToast } from "vue-toastification";

const toast = useToast();

export const errorToast = (error) => {
  toast.error(error, {
    position: "top-center",
    timeout: 5000,
    closeOnClick: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: false,
    rtl: false,
  });
};

export const successToast = (error) => {
  toast.success(error, {
    position: "top-center",
    timeout: 5000,
    closeOnClick: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: false,
    rtl: false,
  });
};
