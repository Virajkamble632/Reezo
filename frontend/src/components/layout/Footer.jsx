import { FiArrowUp, FiMail } from "react-icons/fi";

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030712]">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-2xl font-bold text-white shadow-lg">
                R
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white">Reezo</h2>

                <p className="text-sm text-slate-400">
                  Premium Video Meetings
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-lg leading-8 text-slate-400">
              Reezo is a modern video conferencing platform designed to deliver
              secure, high-quality, and seamless virtual meetings. Powered by
              LiveKit, Reezo enables crystal-clear HD video, real-time
              collaboration, and an intuitive meeting experience for teams,
              students, and businesses.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold text-white">
              Contact Us
            </h3>

            <p className="mb-6 leading-8 text-slate-400">
              Need help with Reezo? Have questions, feedback, or facing a
              technical issue? Our support team is here to help you.
            </p>

            <a
              href="mailto:support.reezo@gmail.com"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-slate-300 transition-all duration-300 hover:border-blue-500 hover:bg-blue-600/20 hover:text-white"
            >
              <FiMail size={20} />
              support.reezo@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-slate-500">
              © {new Date().getFullYear()} Reezo. All Rights Reserved.
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Designed & Developed by{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text font-semibold text-transparent">
                Viraj Kamble
              </span>
            </p>
          </div>

          <button
            onClick={scrollTop}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white transition-all duration-300 hover:bg-blue-600"
          >
            Back to Top
            <FiArrowUp />
          </button>

        </div>
      </div>
    </footer>
  );
};

export default Footer;