// import React from 'react';

import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">About Us</h4>
            <p className="text-sm">
              Hollybooks is your go-to platform for discovering and managing
              your favorite books. We provide detailed information, reviews, and
              recommendations to help you find your next read.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick NavLinknks</h4>
            <ul className="flex-col">
              <li>
                <NavLink to={"/"} className="text-blue-400 hover:underNavLinkne">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink className="text-blue-400 hover:underNavLinkne">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to={"/contactus"} className="text-blue-400 hover:underNavLinkne">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to={"/allbooks"} className="text-blue-400 hover:underNavLinkne">
                  Books
                </NavLink>
              </li>
              <li>
                <NavLink to={"/blogs"} className="text-blue-400 hover:underNavLinkne">
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm">
              Email:{" "}
              <a
                href="mailto:info@hollybooks.com"
                className="text-blue-400 hover:underNavLinkne"
              >
                info@hollybooks.com
              </a>
            </p>
            <p className="text-sm">Phone: +91 9737080195</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Hollybooks. All rights reserved.
          </p>
          <div className="mt-2">

            <NavLink to={"/privacyPolicy"}  href="#" className="text-blue-400 hover:underNavLinkne">
              Privacy Policy
            </NavLink>
            |
            <NavLink to={"/termsOfServices"} href="#" className="text-blue-400 hover:underNavLinkne">
              {" "}
              Terms of Service
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
