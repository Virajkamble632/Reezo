import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "Is Reezo completely free?",
    answer:
      "Yes. You can create and join meetings for free. Premium features will be added in future versions.",
  },
  {
    question: "Does Reezo support screen sharing?",
    answer:
      "Yes. You can securely share your entire screen or a specific window during meetings.",
  },
  {
    question: "Are my meetings secure?",
    answer:
      "Absolutely. Reezo uses JWT Authentication and WebRTC with end-to-end encrypted communication.",
  },
  {
    question: "Can I join without creating an account?",
    answer:
      "No. Reezo requires authentication to create or join meetings for better security.",
  },
  {
    question: "Which devices are supported?",
    answer:
      "Reezo works on Windows, macOS, Linux and all modern mobile browsers.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-28 bg-[#030712]">

      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">

            FAQ

          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">

            Frequently Asked Questions

          </h2>

          <p className="mt-5 text-slate-400">

            Everything you need to know about Reezo.

          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
            >

              <button
                onClick={() =>
                  setActive(active === index ? -1 : index)
                }
                className="flex w-full items-center justify-between px-8 py-6 text-left"
              >

                <h3 className="text-lg font-semibold text-white">

                  {faq.question}

                </h3>

                <motion.div
                  animate={{
                    rotate: active === index ? 180 : 0,
                  }}
                >

                  <FiChevronDown
                    size={24}
                    className="text-blue-400"
                  />

                </motion.div>

              </button>

              <AnimatePresence>

                {active === index && (

                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    className="overflow-hidden"
                  >

                    <p className="px-8 pb-6 leading-8 text-slate-400">

                      {faq.answer}

                    </p>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default FAQ;