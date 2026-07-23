import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

const DeleteMenuModal = ({
  open,
  onClose,
  onConfirm,
  meal,
  loading = false,
}) => {
  if (!open || !meal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          transition={{
            duration: 0.25,
          }}
          className="w-full max-w-md rounded-3xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
        >

          {/* Header */}

          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">

                <AlertTriangle
                  size={26}
                  className="text-red-500"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Delete Menu Item
                </h2>

                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <X size={20} />
            </button>

          </div>

          {/* Body */}

          <div className="px-6 py-8 text-center">

            <motion.div
              animate={{
                rotate: [-5, 5, -5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
              }}
              className="mx-auto mb-5 h-24 w-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"
            >
              <Trash2
                size={45}
                className="text-red-500"
              />
            </motion.div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Are you sure?
            </h3>

            <p className="mt-3 text-gray-500 leading-7">

              You are about to permanently delete

              <span className="font-bold text-red-500">
                {" "}
                "{meal.name}"
              </span>

              .

              <br />

              This action cannot be reversed.

            </p>

          </div>

          {/* Footer */}

          <div className="flex gap-4 border-t border-gray-200 dark:border-gray-700 px-6 py-5">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 py-3 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold py-3 transition flex items-center justify-center gap-2 disabled:opacity-70"
            >

              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={18} />
                  Delete
                </>
              )}

            </button>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default DeleteMenuModal;