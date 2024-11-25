import {
  Facebook,
  Instagram,
  Mail,
  MapPinCheck,
  Phone,
  ShoppingCart,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="py-6 md:py-12 bg-[#1f1f39]">
      <div className="conatiner px-2 xl:px-4">
        <div className="flex flex-col gap-8 md:flex-row text-white justify-between items-start">
          <div className="mb-4 md:mb-0 w-full md:w-1/4">
            <Link href={"/"} className="flex items-center space-x-3 py-4">
              <ShoppingCart className="hidden lg:flex text-3xl text-[#f76411]" />
              <div className="font-bold">
                <span className="text-3xl text-[#f23e14]">S</span>
                <span className="text-2xl text-orange-600">hop</span>
                <span className="text-3xl text-white">K</span>
                <span className="text-2xl text-white">ing</span>
              </div>
            </Link>
            <p className="mb-2 mt-3 md:mt-8 text-white">
              Subscribe to Newsletter
            </p>
            <div className="flex mt-4 items-center mb-4 rounded-full p-1 bg-white">
              <input
                type="email"
                placeholder="Your Email Address..."
                className="p-2 rounded-l-full text-black focus:outline-none"
                name="newsletter"
              />
              <button className="bg-[#ff4500] text-white p-2 rounded-r-full">
                Subscribe
              </button>
            </div>
            <div className="flex space-x-4 mt-5 md:mt-10">
              <Link
                href={"#"}
                className="w-10 h-10 bg-white rounded-full text-black p-1"
              >
                <Facebook size={30} />
              </Link>
              <Link
                href={"#"}
                className="w-10 h-10 bg-white rounded-full text-black p-1"
              >
                <Twitter size={30} />
              </Link>
              <Link
                href={"#"}
                className="w-10 h-10 bg-white rounded-full text-black p-1"
              >
                <Instagram size={30} />
              </Link>
              <Link
                href={"#"}
                className="w-10 h-10 bg-white rounded-full text-black p-1"
              >
                <Youtube size={30} />
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full md-0 md:ms-5">
            <div className="mb-8 md:mb-0 w-full md:w-1/3">
              <h3 className="font-bold mb-2">Support</h3>
              <ul>
                <li className="mb-1">
                  <Link href={"/faq"}>FAQ</Link>
                </li>
                <li className="mb-1">
                  <Link href={"/return-exchange"}>Return & Exchange</Link>
                </li>
                <li className="mb-1">
                  <Link href={"/shipping"}>Shipping</Link>
                </li>
                <li className="mb-1">
                  <Link href={"/size-charts"}>Size Charts</Link>
                </li>
              </ul>
            </div>
            <div className="mb-8 md:mb-0 w-full md:w-1/3">
              <h3 className="font-bold mb-2">Legal</h3>
              <ul>
                <li className="mb-1">
                  <Link href={"/faq"}>FAQ</Link>
                </li>
                <li className="mb-1">
                  <Link href={"/return-exchange"}>Return & Exchange</Link>
                </li>
                <li className="mb-1">
                  <Link href={"/shipping"}>Shipping</Link>
                </li>
                <li className="mb-1">
                  <Link href={"/size-charts"}>Size Charts</Link>
                </li>
              </ul>
            </div>
            <div className="mb-8 md:mb-0 w-full md:w-1/3">
              <h3 className="font-bold mb-2">Contact</h3>
              <p className="mb-1 flex items-center gap-3">
                <MapPinCheck /> House: 123, Street: 456, City: 789
              </p>
              <p className="mb-1 flex items-center gap-3">
                <Mail /> info@sk.com
              </p>
              <p className="mb-1 flex items-center gap-3">
                <Phone /> +38097-437-94-24
              </p>
              <div className="flex space-x-3 mt-4">
                <img
                  src="/app-store.png"
                  className="h-[40px] w-[130px]"
                  alt="app store"
                />
                <img
                  src="/play-store.png"
                  className="h-[40px] w-[130px]"
                  alt="play store"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
