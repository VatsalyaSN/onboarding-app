import { useEffect } from "react";

/**
 * Hook that notifies when clicks outside of the passed ref
 */
function useOutsideAlerter(ref, handleClickOutside) {
  useEffect(() => {
    const handleClickOutsideEvent = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClickOutside();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutsideEvent);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutsideEvent);
    };
  }, [ref]);
}

export default useOutsideAlerter;