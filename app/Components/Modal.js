import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ onClose, content, title }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(); // Close the modal after animation
    }, 300); // Matches animation duration
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="modal-overlay lg:h-full w-full mx-auto fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center z-[9999] items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { ease: "easeInOut", duration: 0.3 } }}
          exit={{ opacity: 0, transition: { ease: "easeOut", duration: 0.3 } }}
        >
          <motion.dialog
            open
            className="w-full max-w-[350px] lg:max-w-[400px] overflow-y-auto max-h-[85vh] p-5 rounded-2xl flex flex-col bg-white text-black sm:w-[80%] md:w-[450px] focus:border-none focus:outline-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { ease: "easeIn", duration: 0.3 } }}
            exit={{ scale: 0.8, opacity: 0, transition: { ease: "easeOut", duration: 0.3 } }}
          >
            {/* Title Section */}
            <div className="mb-5 w-full">
              <div className="flex justify-between items-center w-full">
                <h3 className="font-semibold text-xl">{title}</h3>
                <div className="bg-[#dc2626] py-1 px-1 rounded-full">
                  <IoClose className="cursor-pointer text-white" onClick={handleClose} />
                </div>
              </div>
              <hr className="mt-2" />
            </div>

            {/* Content */}
            <div>{content}</div>
          </motion.dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
