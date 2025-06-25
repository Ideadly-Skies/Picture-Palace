import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-zinc-800 py-10 mt-16">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-10">
        {/* Left Section */}
        <aside className="flex-1 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/movie-projector.png"
              alt="Movie Icon"
              className="w-8 h-8"
            />
            <a className="font-bold text-xl tracking-wide hover:text-red-500 transition-colors">
              Movie Palace
            </a>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Obie Industries Ltd. <br />
            Providing reliable movies since 1992
          </p>
        </aside>

        {/* Nav Groups */}
        <nav className="flex flex-col space-y-2">
          <h6 className="text-white font-semibold mb-1 uppercase tracking-wide text-sm">Services</h6>
          <a className="text-white/70 hover:text-white cursor-pointer transition">Branding</a>
          <a className="text-white/70 hover:text-white cursor-pointer transition">Design</a>
          <a className="text-white/70 hover:text-white cursor-pointer transition">Marketing</a>
          <a className="text-white/70 hover:text-white cursor-pointer transition">Advertisement</a>
        </nav>

        <nav className="flex flex-col space-y-2">
          <h6 className="text-white font-semibold mb-1 uppercase tracking-wide text-sm">Company</h6>
          <a className="text-white/70 hover:text-white cursor-pointer transition">About us</a>
          <a className="text-white/70 hover:text-white cursor-pointer transition">Contact</a>
          <a className="text-white/70 hover:text-white cursor-pointer transition">Jobs</a>
          <a className="text-white/70 hover:text-white cursor-pointer transition">Press kit</a>
        </nav>

        <nav className="flex flex-col space-y-2">
          <h6 className="text-white font-semibold mb-1 uppercase tracking-wide text-sm">Legal</h6>
          <a className="text-white/70 hover:text-white cursor-pointer transition">Terms of use</a>
          <a className="text-white/70 hover:text-white cursor-pointer transition">Privacy policy</a>
          <a className="text-white/70 hover:text-white cursor-pointer transition">Cookie policy</a>
        </nav>
      </div>
    </footer>
  );
}
