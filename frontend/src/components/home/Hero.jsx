import { motion } from "framer-motion";


const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#030712] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-10 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[160px]" />
        <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-[1450px] mx-auto px-8 lg:px-12 pt-36">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
            >

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2">

                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>

                <span className="text-sm font-medium text-blue-300">
                Modern Video Meetings
                </span>

            </div>

            <h1 className="mt-8 text-6xl xl:text-7xl font-extrabold leading-tight">

                <span className="text-white">
                Meet.
                </span>

                <br />

                <span className="text-white">
                Collaborate.
                </span>

                <br />

                <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Build Together.
                </span>

            </h1>

            <p className="mt-8 text-lg leading-8 text-slate-400">

                Experience crystal-clear HD video meetings powered by WebRTC.
                Collaborate instantly with your team using screen sharing,
                live chat and secure end-to-end encrypted communication.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

                <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white transition hover:scale-105 hover:shadow-[0_15px_40px_rgba(37,99,235,.35)]">

                Start Meeting →

                </button>

                <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">

                Join Meeting

                </button>

            </div>

            <div className="mt-10 flex flex-wrap gap-4">

                {[
                "HD Video",
                "Live Chat",
                "Screen Share",
                "256-bit Security",
                ].map((item) => (

                <div
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300 backdrop-blur-xl"
                >

                    {item}

                </div>

                ))}

            </div>

            <div className="mt-12 flex items-center gap-5">

                <div className="flex -space-x-3">

                {["A", "E", "J", "V"].map((user) => (

                    <div
                    key={user}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#030712] bg-gradient-to-br from-blue-500 to-violet-600 font-bold text-white"
                    >

                    {user}

                    </div>

                ))}

                </div>

                <div>

                <h3 className="font-semibold text-white">

                    Trusted by 10,000+ Professionals

                </h3>

                <p className="text-sm text-slate-400">

                    Secure meetings across 120+ countries.

                </p>

                </div>

            </div>

            </motion.div>

          </div>

          {/* ================= RIGHT ================= */}

            <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:flex items-center justify-center"
            >

            {/* Floating Security Card */}

            <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-10 top-9 z-30 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5"
            >
                <p className="text-xs text-slate-400">
                Security
                </p>

                <h2 className="mt-2 text-2xl font-bold text-green-400">
                256-bit
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                End-to-End Encryption
                </p>
            </motion.div>

            {/* Floating Latency Card */}

            <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -right-8 bottom-20 z-30 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5"
            >
                <p className="text-xs text-slate-400">
                Network
                </p>

                <h2 className="mt-2 text-3xl font-bold text-cyan-400">
                286ms
                </h2>

                <p className="text-sm text-slate-400">
                Ultra Low Latency
                </p>
            </motion.div>

            {/* Meeting Window */}

            <div className="w-[620px] rounded-[34px] border border-white/10 bg-[#0F172A]/80 backdrop-blur-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,.45)]">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

                <div>

                    <h2 className="text-lg font-semibold text-white">
                    Product Design Meeting
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                    4 Participants • Live Now
                    </p>

                </div>

                <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">

                    <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />

                    <span className="text-sm text-green-400">
                    Live
                    </span>

                </div>

                </div>

                {/* Participants */}

                <div className="grid grid-cols-2 gap-4 p-5">

                {[
                    {
                    name: "Alex",
                    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Alex",
                    },
                    {
                    name: "Emma",
                    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Emma",
                    },
                    {
                    name: "Viraj",
                    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Viraj",
                    },
                    {
                    name: "Sarah",
                    image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah",
                    },
                ].map((user, index) => (

                    <div
                    key={index}
                    className="relative h-48 overflow-hidden rounded-3xl border border-white/10 bg-slate-900"
                    >

                    <img
                        src={user.image}
                        alt={user.name}
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    <div className="absolute bottom-4 left-4 flex items-center gap-2">

                        <span className="h-3 w-3 rounded-full bg-green-400" />

                        <span className="text-white font-medium">
                        {user.name}
                        </span>

                    </div>

                    {index === 2 && (
                        <div className="absolute inset-0 rounded-3xl border-4 border-blue-500 animate-pulse" />
                    )}

                    </div>

                ))}

                </div>

                {/* Controls */}

                <div className="border-t border-white/10 p-5">

                <div className="flex items-center justify-center gap-4">

                    {[
                    "🎤",
                    "📷",
                    "🖥️",
                    "💬",
                    "👥",
                    ].map((icon, index) => (

                    <button
                        key={index}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl transition hover:-translate-y-1 hover:bg-white/10"
                    >
                        {icon}
                    </button>

                    ))}

                    <button className="rounded-2xl bg-red-500 px-6 py-4 font-semibold text-white transition hover:bg-red-600">

                    Leave

                    </button>

                </div>

                </div>

            </div>

            </motion.div>

          <div>

            {/* Meeting UI */}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;