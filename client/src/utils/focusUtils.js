export const removeFocus = () => {
  const activeElement = document.activeElement;
  if (activeElement && activeElement !== document.body) {
    activeElement.blur();
  }
};
export const storeFocusedElement = () => {
  return document.activeElement;
};
export const restoreFocus = (savedFocusRef) => {
  try {
    if (
      savedFocusRef?.current &&
      document.body.contains(savedFocusRef.current)
    ) {
      requestAnimationFrame(() => {
        if (savedFocusRef.current) {
          savedFocusRef.current.focus();
          savedFocusRef.current = null;
        }
      });
    }
  } catch (error) {
  }
};
export const focusFirstElement = (container) => {
  if (!container) return;
  const focusableSelectors = [
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "a[href]",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");
  const focusableElement = container.querySelector(focusableSelectors);
  if (focusableElement) {
    setTimeout(() => {
      focusableElement.focus();
    }, 100);
  }
};
export const getAccessibleModalProps = (open, onClose) => {
  return {
    open,
    onClose,
    disableAutoFocus: false,
    disableEnforceFocus: true,
    disableRestoreFocus: false,
    TransitionProps: {
      onEnter: () => {
        setTimeout(() => {
          removeFocus();
        }, 0);
      },
      onExited: () => {
        removeFocus();
      },
    },
  };
};
export const createFocusManager = () => {
  let previousFocus = null;
  const handleModalOpen = () => {
    previousFocus = storeFocusedElement();
    removeFocus();
  };
  const handleModalClose = () => {
    if (previousFocus) {
      restoreFocus(previousFocus);
      previousFocus = null;
    }
  };
  return {
    handleModalOpen,
    handleModalClose,
  };
};