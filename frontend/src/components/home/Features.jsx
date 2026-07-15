import { motion } from "framer-motion";
import {
  FiVideo,
  FiMonitor,
  FiMessageSquare,
  FiShield,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";

const features = [
  {
    icon: <FiVideo size={28} />,
    title: "HD Video Meetings",
    desc: "Crystal-clear video meetings with low latency and smooth performance.",
  },
  {
    icon: <FiMonitor size={28} />,
    title: "Screen Sharing",
    desc: "Present your screen instantly for seamless collaboration.",
  },
  {
    icon: <FiMessageSquare size={28} />,
    title: "Live Chat",
    desc: "Chat with participants without interrupting the meeting.",
  },
  {
    icon: <FiShield size={28} />,
    title: "Secure Meetings",
    desc: "Protected with end-to-end encryption for complete privacy.",
  },
  {
    icon: <FiUsers size={28} />,
    title: "Team Collaboration",
    desc: "Invite teammates, manage participants and collaborate together.",
  },
  {
    icon: <FiCalendar size={28} />,
    title: "Meeting Scheduling",
    desc: "Schedule meetings and invite participants with one click.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative py-28 bg-[#030712]"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">
            Powerful Features
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white">
            Everything You Need
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-400">
            Reezo provides all the essential tools for secure,
            fast and modern online collaboration.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 mt-20 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .5,
                delay: index * .1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-8
                transition-all
              "
            >

              {/* Glow */}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10" />

              {/* Icon */}

              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg">

                {feature.icon}

              </div>

              <h3 className="relative mt-7 text-2xl font-semibold text-white">

                {feature.title}

              </h3>

              <p className="relative mt-4 text-slate-400 leading-7">

                {feature.desc}

              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;