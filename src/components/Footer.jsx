import React from "react";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content py-10">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-10">
        <aside className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/movie-projector.png"
              alt="Movie Icon"
              className="w-8 h-8"
            />
            <a className="font-bold text-xl">Picture Palace</a> 
          </div>
          <p>
            Obie Industries Ltd.
            <br />
            Providing reliable movies since 1992
          </p>
        </aside>
        
        <nav className="flex flex-col">
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>

        <nav className="flex flex-col">
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>

        <nav className="flex flex-col">
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
    </footer>
  );
}
