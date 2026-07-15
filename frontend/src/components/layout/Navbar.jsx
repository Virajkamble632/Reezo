import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineMenuAlt3,
  HiX,
  HiChevronDown,
} from "react-icons/hi";

import {
  FiArrowRight,
} from "react-icons/fi";

const Navbar = () => {

  const [mobileOpen, setMobileOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 20);

    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  const navLinks = [

    {
      name: "Home",
      path: "/",
    },

    {
      name: "Features",
      path: "#features",
    },

    {
      name: "Pricing",
      path: "#pricing",
    },

    {
      name: "Contact",
      path: "#contact",
    },

  ];

  return (

    <>

      <motion.header

        initial={{
          y: -70,
          opacity: 0,
        }}

        animate={{
          y: 0,
          opacity: 1,
        }}

        transition={{
          duration: .55,
        }}

        className="fixed top-0 left-0 w-full z-50 px-6 pt-5"

      >

        <div
          className={`
          max-w-[1500px]
          mx-auto
          transition-all
          duration-300
          rounded-3xl

          ${
            scrolled
              ? "bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,.25)]"
              : "bg-[#0B1120]/80 backdrop-blur-xl border border-white/10"
          }

          `}
        >

          <div
            className="
            h-20
            px-8
            grid
            grid-cols-[240px_1fr_240px]
            items-center
            "
          >

            {/* ===================== LOGO ===================== */}

            <Link
              to="/"
              className="flex items-center gap-4"
            >

              <div
                className="
                relative
                h-12
                w-12
                rounded-full

                bg-gradient-to-br
                from-blue-500
                via-indigo-500
                to-violet-600

                flex
                items-center
                justify-center

                shadow-[0_0_35px_rgba(59,130,246,.45)]
                "
              >

                <div
                  className="
                  absolute
                  inset-0
                  rounded-full
                  bg-blue-500
                  blur-xl
                  opacity-40
                  "
                />

                <span
                  className="
                  relative
                  text-white
                  font-bold
                  text-xl
                  "
                >
                  R
                </span>

              </div>

              <div>

                <h1
                  className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-white
                  "
                >
                  Reezo
                </h1>

                <p
                  className="
                  text-xs
                  text-slate-400
                  "
                >
                  Video Meetings
                </p>

              </div>

            </Link>

            {/* ===================== NAVIGATION ===================== */}

            <nav
              className="
              hidden
              lg:flex
              justify-center
              items-center
              gap-12
              "
            >

              {navLinks.map((item) => (

                <NavLink

                  key={item.name}

                  to={item.path}

                  className={({ isActive }) =>

                    `

                    relative

                    text-[15px]

                    font-medium

                    transition-all

                    duration-300

                    ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }

                    `

                  }

                >

                  {item.name}

                  <span

                    className="
                    absolute

                    left-1/2

                    -bottom-3

                    h-[2px]

                    w-0

                    -translate-x-1/2

                    rounded-full

                    bg-gradient-to-r

                    from-blue-500

                    to-violet-500

                    transition-all

                    duration-300

                    group-hover:w-full

                    "

                  />

                </NavLink>

              ))}

            </nav>

            {/* ===================== RIGHT ===================== */}

            <div
              className="
              hidden
              lg:flex
              justify-end
              items-center
              gap-5
              "
            >
                          <Link
                to="/login"
                className="
                text-[15px]
                font-medium
                text-slate-300
                hover:text-white
                transition-colors
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                group
                flex
                items-center
                gap-2

                rounded-2xl

                bg-gradient-to-r
                from-blue-600
                via-indigo-500
                to-violet-600

                px-6
                py-3

                font-semibold
                text-white

                transition-all
                duration-300

                hover:scale-105

                hover:shadow-[0_12px_35px_rgba(59,130,246,.45)]
                "
              >
                Start Meeting

                <FiArrowRight
                  className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  "
                />

              </Link>

            </div>

            {/* Mobile Button */}

            <button
              onClick={() => setMobileOpen(true)}
              className="
              lg:hidden
              justify-self-end
              text-white
              "
            >
              <HiOutlineMenuAlt3 size={28} />
            </button>

          </div>

        </div>

      </motion.header>

      {/* ================= Overlay ================= */}

      <div
        onClick={() => setMobileOpen(false)}
        className={`
        fixed
        inset-0
        z-40
        bg-black/60
        backdrop-blur-sm
        transition-all
        duration-300

        ${
          mobileOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }

        `}
      />

      {/* ================= Mobile Menu ================= */}

      <div
        className={`
        fixed
        top-0
        right-0
        z-50

        h-screen
        w-[320px]

        bg-[#0B1120]

        border-l
        border-white/10

        transition-transform
        duration-500

        ${
          mobileOpen
            ? "translate-x-0"
            : "translate-x-full"
        }

        `}
      >

        <div
          className="
          flex
          items-center
          justify-between
          p-6
          border-b
          border-white/10
          "
        >

          <div className="flex items-center gap-3">

            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">

              <span className="font-bold text-white">
                R
              </span>

            </div>

            <h2 className="text-xl font-bold text-white">
              Reezo
            </h2>

          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="text-white"
          >
            <HiX size={28} />
          </button>

        </div>

        <div className="flex flex-col px-8 py-8 gap-7">

          {navLinks.map((item) => (

            <NavLink

              key={item.name}

              to={item.path}

              onClick={() => setMobileOpen(false)}

              className="
              text-lg
              text-slate-300
              hover:text-white
              transition-colors
              "

            >

              {item.name}

            </NavLink>

          ))}

          <div className="border-t border-white/10 pt-8 space-y-5">

            <Link

              to="/login"

              onClick={() => setMobileOpen(false)}

              className="block text-slate-300"

            >

              Login

            </Link>

            <Link

              to="/register"

              onClick={() => setMobileOpen(false)}

              className="
              flex
              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-r

              from-blue-600

              to-violet-600

              py-4

              font-semibold

              text-white

              "

            >

              Start Meeting

            </Link>

          </div>

        </div>

      </div>

    </>

  );

};

export default Navbar;