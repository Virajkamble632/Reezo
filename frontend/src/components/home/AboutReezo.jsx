import {
  Video,
  ShieldCheck,
  Users,
  Zap,
  Globe,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "HD Video Meetings",
    description:
      "Enjoy crystal-clear video and audio quality for smooth virtual meetings.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Communication",
    description:
      "Built with WebRTC technology to provide secure and private meetings.",
  },
  {
    icon: Users,
    title: "Easy Collaboration",
    description:
      "Create or join meetings instantly using a secure meeting ID.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Ultra-low latency communication for a seamless meeting experience.",
  },
  {
    icon: Globe,
    title: "Accessible Anywhere",
    description:
      "Join meetings from desktop or mobile with a fully responsive interface.",
  },
  {
    icon: Sparkles,
    title: "Modern Experience",
    description:
      "A beautiful, intuitive interface designed for effortless communication.",
  },
];

export default function AboutReezo() {
  return (
    <section
      id="about"
      className="relative py-24 px-6 lg:px-12 bg-[#030712]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            About Reezo
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white">
            Empowering Seamless
            <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Virtual Collaboration
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Reezo is a next-generation video conferencing platform built to make
            online communication simple, secure, and reliable. Whether you're
            collaborating with teammates, attending virtual classes, or hosting
            business meetings, Reezo provides a fast, intuitive, and engaging
            experience powered by WebRTC technology.
          </p>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-2"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600">
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-slate-400 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            ["HD", "Crystal Clear Video"],
            ["LiveKit", "Real-Time Platform"],
            ["Low Latency", "Smooth Communication"],
            ["Encrypted", "Secure Meetings"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
            >
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {value}
              </h3>

              <p className="mt-3 text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-violet-600/10 p-10 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Experience Smarter Meetings?
          </h2>

          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Join Reezo today and enjoy secure, high-quality video conferencing
            designed for teams, professionals, and everyone who values seamless
            communication.
          </p>

          <button className="mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white transition hover:scale-105">
            Start Meeting
          </button>
        </div>
      </div>
    </section>
  );
}