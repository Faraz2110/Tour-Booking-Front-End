import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt } from "react-icons/fa";
import AddCaro from "../../components/AddCaro";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        
        {/* Menu / Tours */}
        <div>
          <h3 className="font-bold text-lg mb-3 text-yellow-400">Tours</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">City Tours</a></li>
            <li><a href="#" className="hover:text-yellow-400">Adventure Trips</a></li>
            <li><a href="#" className="hover:text-yellow-400">Honeymoon Packages</a></li>
            <li><a href="#" className="hover:text-yellow-400">Cultural Tours</a></li>
            <li><a href="#" className="hover:text-yellow-400">Group Bookings</a></li>
            <li><a href="#" className="hover:text-yellow-400">Weekend Getaways</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold text-lg mb-3 text-yellow-400">FZ Tourmate</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400">Why Choose Us</a></li>
            <li><a href="#" className="hover:text-yellow-400">Our Guides</a></li>
            <li><a href="#" className="hover:text-yellow-400">Travel Blog</a></li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h3 className="font-bold text-lg mb-3 text-yellow-400">Popular Destinations</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Islamabad</a></li>
            <li><a href="#" className="hover:text-yellow-400">Murree</a></li>
            <li><a href="#" className="hover:text-yellow-400">Naran & Kaghan</a></li>
            <li><a href="#" className="hover:text-yellow-400">Hunza Valley</a></li>
            <li><a href="#" className="hover:text-yellow-400">Skardu</a></li>
            <li><a href="#" className="hover:text-yellow-400">Swat</a></li>
          </ul>
        </div>

        {/* Social + App Links */}
        <div className="flex flex-col items-start md:items-center">
          <h3 className="font-bold text-lg mb-3">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-yellow-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400"><FaTwitter /></a>
          </div>
          <div className="space-y-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-36 cursor-pointer"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="w-32 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-10 text-center border-t border-gray-700 pt-4 text-sm">
        <p>
          &copy; {new Date().getFullYear()} FZ Tourmate. All Rights Reserved.
        </p>
        <p className="text-gray-400 ">Powered by <span className="text-[#ffdb00]">TECHLYZE</span> </p>
    {/* <span>  <AddCaro/></span> */}
      </div>
    </footer>
  );
};

export default Footer;
