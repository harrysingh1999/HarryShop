import React from "react";
import { NavLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <div className="flex items-end w-full mt-12 md:mt-8">
      <footer className="w-full bg-black/90">
        <div className="mx-5 flex flex-col flex-wrap px-5 pt-10 text-white text-sm md:text-base md:items-center lg:items-start md:flex-row md:flex-no-wrap">
          <div className="flex-shrink-0 w-64 mx-auto text-center mb-8">
            <NavLink to="/">HarryShop</NavLink>
            <p className="text-xs ">Explore, Shop and Repeat</p>
            <div className="mt-2">
              <span className="inline-flex justify-center mb-2 sm:ml-auto sm:mt-0 sm:justify-start">
                <a
                  href="https://github.com/harrysingh1999"
                  className=" cursor-pointer"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/harvinder-singh-shahu-ab7b1b1a0/"
                  className="ml-3  cursor-pointer"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://www.instagram.com/harrysingh_1999/"
                  className="ml-3  cursor-pointer"
                >
                  <InstagramIcon />
                </a>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap flex-grow text-center">
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest  uppercase title-font">
                About
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a className=" cursor-pointer">Company</a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer">Careers</a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer">Blog</a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest  uppercase title-font">
                Support
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a className=" cursor-pointer">Contact Support</a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer">Help Resources</a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer">Release Updates</a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest  uppercase title-font">
                Platform
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a className=" cursor-pointer">Terms &amp; Privacy</a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer">Pricing</a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer">FAQ</a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest  uppercase title-font">
                Contact
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a className=" cursor-pointer">hs541156@gmail.com</a>
                </li>

                <li className="mt-3">
                  <a className=" cursor-pointer">+91 88261 41160</a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="px-5 py-4 bg-black/25 mx-auto text-white">
          <p className="text-sm capitalize text-center">
            HarryShop © 2024 All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
