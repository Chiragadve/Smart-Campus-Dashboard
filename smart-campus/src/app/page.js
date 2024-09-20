"use client"; // Enable client-side features

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slidesRef = useRef([]);

  useEffect(() => {
    const showSlides = () => {
      slidesRef.current.forEach((slide) => (slide.style.display = "none"));
      slidesRef.current[slideIndex].style.display = "block";
    };

    const changeSlide = () => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slidesRef.current.length);
    };

    showSlides();

    const interval = setInterval(() => {
      changeSlide();
      showSlides();
    }, 6000);

    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-oxford-blue-3 shadow-md z-10">
        <div className="flex justify-between items-center h-24 px-5">
          <a href="#" className="logo">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={50}
              className="object-contain"
            />
          </a>
          <div className="nav-links flex flex-grow justify-end">
            <ul className="flex gap-10 pr-10">
              <li>
                <a className="hover:text-gray-300 transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-gray-300 transition duration-300">
                  Events
                </a>
              </li>
              <li>
                <a className="hover:text-gray-300 transition duration-300">
                  Cafeteria
                </a>
              </li>
              <li>
                <a className="hover:text-gray-300 transition duration-300">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section
        className="relative mt-24 h-96 bg-cover bg-center" // Add margin-top to avoid navbar overlap
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      >
        <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
          <div className="slideshow-container mt-10">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="mySlides fade"
                ref={(el) => (slidesRef.current[index] = el)}
              >
                <Image
                  src={`/image${index + 1}.jpeg`}
                  alt={`Slide ${index + 1}`}
                  className="slide-image"
                  width={1180} // Set width to 1180px
                  height={368} // Set height to 400px for the banner
                  layout="fixed" // Use fixed layout
                />
              </div>
            ))}

            <div className="text-center mt-4">
              {[...Array(4)].map((_, index) => (
                <span
                  key={index}
                  className="dot"
                  onClick={() => setSlideIndex(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .mySlides {
            display: none;
            position: relative;
            margin: 0 auto;
            width: 1180px; /* Set width to 1180px */
          }

          .slide-image {
            width: 100%;
            height: 368px;
            object-fit: cover;
          }

          .dot {
            cursor: pointer;
            height: 15px;
            width: 15px;
            margin: 0 2px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            transition: background-color 0.3s;
          }

          .dot:hover {
            background-color: #717171;
          }

          .active {
            background-color: #717171;
          }

          .fade {
            animation: fade 1.5s;
          }

          @keyframes fade {
            from {
              opacity: 0.4;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
