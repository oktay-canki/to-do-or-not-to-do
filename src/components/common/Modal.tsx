interface ModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({
  message,
  onConfirm,
  onCancel,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondary p-6 rounded-lg shadow-lg w-2/3 max-w-80 lg:max-w-lg z-50">
        <p className="mb-4">{message}</p>
        <div className="flex justify-between">
          <button
            className="bg-green-500 text-white py-2 px-8 rounded mr-2"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-red-500 text-white py-2 px-8 rounded"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
