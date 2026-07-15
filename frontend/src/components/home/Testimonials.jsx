import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Alex Morgan",
    role: "Product Designer",
    company: "Design Studio",
    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Alex",
    review:
      "Reezo completely transformed the way our team collaborates. The interface is clean, modern, and incredibly smooth.",
  },
  {
    name: "Sarah Williams",
    role: "Software Engineer",
    company: "Tech Solutions",
    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah",
    review:
      "The video quality and screen sharing are outstanding. Reezo feels like a premium meeting platform.",
  },
  {
    name: "John Carter",
    role: "Project Manager",
    company: "Creative Labs",
    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=John",
    review:
      "Our daily meetings have become faster and more productive. Beautiful UI and excellent performance.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-28 bg-[#030712] overflow-hidden">

      {/* Background Glow */}

      <div className="absolute inset-0">

        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute right-20 bottom-0 h-72 w-72 rounded-full bg-violet-600/10 blur-[120px]" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">

            Testimonials

          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">

            Loved by Teams Everywhere

          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-400">

            Professionals trust Reezo for secure,
            reliable and high-quality video meetings.

          </p>

        </motion.div>

        <div className="grid gap-8 mt-20 lg:grid-cols-3">

          {testimonials.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
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
              className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8"
            >

              {/* Stars */}

              <div className="flex gap-1 text-yellow-400">

                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    fill="currentColor"
                  />
                ))}

              </div>

              {/* Review */}

              <p className="mt-6 leading-8 text-slate-300">

                "{item.review}"

              </p>

              {/* User */}

              <div className="mt-8 flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-full border border-white/10 bg-white"
                />

                <div>

                  <h3 className="font-semibold text-white">

                    {item.name}

                  </h3>

                  <p className="text-sm text-slate-400">

                    {item.role}

                  </p>

                  <p className="text-xs text-blue-400">

                    {item.company}

                  </p>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;