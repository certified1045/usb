// components/ToastDisplay.js
"use client"; // This component needs to be a client component

import { getClientSideCookie, removeClientSideCookie } from "@/lib/utils";
import { useEffect } from "react";
import { toast } from "sonner";

function ToastDisplay() {
  useEffect(() => {
    const toastMessage = getClientSideCookie("toastMessage");
    const toastType = getClientSideCookie("toastType");

    if (toastMessage) {
      if (toastType === "error") {
        toast.error(toastMessage);
      } else {
        toast.success(toastMessage); // Default to success if no type specified
      }
      // Clean up the cookies after displaying the toast
      removeClientSideCookie("toastMessage");
      removeClientSideCookie("toastType");
    }
  }, []);

  return null; // This component doesn't render any visible UI directly
}

export default ToastDisplay;
