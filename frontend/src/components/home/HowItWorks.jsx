import { motion } from "framer-motion";
import {
  FiUserPlus,
  FiVideo,
  FiUsers,
} from "react-icons/fi";

const steps = [
  {
    icon: <FiUserPlus size={32} />,
    title: "Create Your Account",
    description:
      "Sign up in seconds and securely access your personal meeting dashboard.",
  },
  {
    icon: <FiVideo size={32} />,
    title: "Start or Join a Meeting",
    description:
      "Create a meeting instantly or join with a meeting ID or invitation link.",
  },
  {
    icon: <FiUsers size={32} />,
    title: "Collaborate Together",
    description:
      "Enjoy HD video, live chat, screen sharing and real-time collaboration.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-28 bg-[#030712] overflow-hidden">

      {/* Background Glow */}

      <div className="absolute inset-0">

        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-blue-300 text-sm">
            Simple Workflow
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            How Reezo Works
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-slate-400">
            Start collaborating with your team in just three simple steps.
          </p>

        </motion.div>

        <div className="relative mt-24 grid lg:grid-cols-3 gap-10">

          {/* Line */}

          <div className="hidden lg:block absolute top-24 left-[16%] w-[68%] h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-600 opacity-30" />

          {steps.map((step, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .5,
                delay: index * .2,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 text-center"
            >

              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 font-bold text-white shadow-lg">

                {index + 1}

              </div>

              <div className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 text-white">

                {step.icon}

              </div>

              <h3 className="mt-8 text-2xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-4 text-slate-400 leading-7">
                {step.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;