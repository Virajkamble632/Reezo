import { motion } from "framer-motion";
import {
  FiShield,
  FiZap,
  FiGlobe,
  FiCpu,
} from "react-icons/fi";

const stats = [
  {
    icon: <FiShield size={30} />,
    value: "256-bit",
    title: "End-to-End Encryption",
    description: "Enterprise-grade security for every meeting.",
  },
  {
    icon: <FiZap size={30} />,
    value: "<300ms",
    title: "Ultra Low Latency",
    description: "Smooth HD communication with minimal delay.",
  },
  {
    icon: <FiGlobe size={30} />,
    value: "99.99%",
    title: "Server Uptime",
    description: "Reliable cloud infrastructure available 24/7.",
  },
  {
    icon: <FiCpu size={30} />,
    value: "WebRTC",
    title: "Powered Technology",
    description: "Real-time peer-to-peer video communication.",
  },
];

const Statistics = () => {
  return (
    <section className="relative py-28 bg-[#030712] overflow-hidden">

      {/* Background Glow */}

      <div className="absolute inset-0">

        <div className="absolute top-20 left-1/3 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute bottom-0 right-20 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-blue-300 text-sm">

            Platform Performance

          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">

            Built for Speed & Security

          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-slate-400 text-lg">

            Reezo combines modern WebRTC technology with enterprise-grade
            security to deliver smooth, reliable and secure online meetings.

          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 mt-20 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .5,
                delay: index * .15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 overflow-hidden"
            >

              {/* Hover Glow */}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-600/10 via-transparent to-violet-600/10" />

              {/* Icon */}

              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-[0_0_30px_rgba(37,99,235,.35)]">

                {item.icon}

              </div>

              {/* Value */}

              <h3 className="relative mt-8 text-4xl font-bold text-white">

                {item.value}

              </h3>

              {/* Title */}

              <h4 className="relative mt-3 text-xl font-semibold text-white">

                {item.title}

              </h4>

              {/* Description */}

              <p className="relative mt-4 text-slate-400 leading-7">

                {item.description}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Statistics;