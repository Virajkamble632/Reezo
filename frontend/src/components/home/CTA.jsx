import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const CTA = () => {
  return (
    <section className="relative py-28 bg-[#030712] overflow-hidden">

      {/* Background Glow */}

      <div className="absolute inset-0">

        <div className="absolute left-1/3 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-[140px]" />

        <div className="absolute right-20 bottom-0 h-72 w-72 rounded-full bg-violet-600/20 blur-[140px]" />

      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-12 lg:p-20 text-center"
        >

          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-blue-300 text-sm">

            Get Started Today

          </span>

          <h2 className="mt-8 text-4xl md:text-6xl font-bold text-white leading-tight">

            Ready to Transform
            <br />
            Your Online Meetings?

          </h2>

          <p className="mt-8 max-w-2xl mx-auto text-lg text-slate-400 leading-8">

            Experience secure, high-quality video conferencing,
            real-time collaboration, and effortless communication
            with Reezo.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <button
              className="
                group
                flex
                items-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-violet-600
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition
                hover:scale-105
                hover:shadow-[0_20px_45px_rgba(37,99,235,.35)]
              "
            >
              Start Meeting

              <FiArrowRight
                className="transition group-hover:translate-x-1"
              />

            </button>

            <button
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                backdrop-blur-xl
                transition
                hover:bg-white/10
              "
            >
              Learn More
            </button>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default CTA;