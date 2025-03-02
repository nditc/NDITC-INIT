import React from "react";

const ConfirmClose = ({
  closeToast,
  deleteAction,
}: {
  closeToast?: any;
  deleteAction: () => void;
}) => {
  return (
    <div>
      <p>Are you sure about this action?</p>
      <div className="mt-2 flex items-center justify-end gap-2">
        <button
          onClick={closeToast}
          className="rounded-full bg-secondary-500 px-4 py-1.5 text-sm text-white hover:bg-primary-400 focus:outline-none"
        >
          No
        </button>
        <button
          onClick={async () => {
            deleteAction();
            closeToast();
          }}
          className="rounded-full bg-yellow-500 px-4 py-1.5 text-sm text-white hover:bg-yellow-600 focus:outline-none"
        >
          Sure!
        </button>
      </div>
    </div>
  );
};

export default ConfirmClose;
