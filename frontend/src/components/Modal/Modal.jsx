import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 40,
  },
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "max-w-lg",
}) => {
  return (
    <AnimatePresence>

      {isOpen && (

        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        >

          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className={`w-full ${size} rounded-3xl border border-white/10 bg-[#111827]/90 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,.45)]`}
          >

            {/* Header */}

            <div className="flex items-center justify-between border-b border-white/10 px-7 py-5">

              <h2 className="text-xl font-semibold text-white">
                {title}
              </h2>

              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <HiX size={22} />
              </button>

            </div>

            {/* Body */}

            <div className="p-7">

              {children}

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
};

export default Modal;