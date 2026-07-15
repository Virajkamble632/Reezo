import { Link } from "react-router-dom";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiArrowUp,
} from "react-icons/fi";

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Logo */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-2xl font-bold text-white shadow-lg">

                R

              </div>

              <div>

                <h2 className="text-3xl font-bold text-white">

                  Reezo

                </h2>

                <p className="text-sm text-slate-400">

                  Premium Video Meetings

                </p>

              </div>

            </div>

            <p className="mt-8 max-w-md leading-8 text-slate-400">

              Reezo is a modern real-time video conferencing
              platform built for teams, students and businesses.
              Collaborate seamlessly with HD meetings,
              live chat and secure screen sharing.

            </p>

            <div className="mt-8 flex gap-4">

              {[
                FiGithub,
                FiLinkedin,
                FiTwitter,
                FiInstagram,
              ].map((Icon, index) => (

                <button
                  key={index}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-1 hover:bg-blue-600 hover:text-white"
                >

                  <Icon size={20} />

                </button>

              ))}

            </div>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-white">

              Product

            </h3>

            <div className="space-y-4">

              <Link className="block text-slate-400 hover:text-white">
                Features
              </Link>

              <Link className="block text-slate-400 hover:text-white">
                Meetings
              </Link>

              <Link className="block text-slate-400 hover:text-white">
                Security
              </Link>

              <Link className="block text-slate-400 hover:text-white">
                Pricing
              </Link>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-white">

              Company

            </h3>

            <div className="space-y-4">

              <Link className="block text-slate-400 hover:text-white">
                About
              </Link>

              <Link className="block text-slate-400 hover:text-white">
                Careers
              </Link>

              <Link className="block text-slate-400 hover:text-white">
                Blog
              </Link>

              <Link className="block text-slate-400 hover:text-white">
                Contact
              </Link>

            </div>

          </div>

          {/* Support */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-white">

              Support

            </h3>

            <div className="space-y-4">

              <Link className="block text-slate-400 hover:text-white">
                Help Center
              </Link>

              <Link className="block text-slate-400 hover:text-white">
                Privacy Policy
              </Link>

              <Link className="block text-slate-400 hover:text-white">
                Terms of Service
              </Link>

              <Link className="block text-slate-400 hover:text-white">
                Documentation
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">

          <p className="text-slate-500">

            © {new Date().getFullYear()} Reezo. All Rights Reserved.

          </p>

          <button
            onClick={scrollTop}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white transition hover:bg-blue-600"
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