"use client";

import Head from "next/head";
import { BsArrowRight } from "react-icons/bs";
import { FaFantasyFlightGames } from "react-icons/fa";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [searchedCard, setSearchedCard] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [initialMessage, setInitialMessage] = useState(true);
  const debounceRef = useRef(null);

  const getInitialCards = async () => {
    setLoader(true);
    await axios
      .get(`http://localhost:8000/api/v1/cards`)
      .then((result) => {
        console.log(result.data);
        setLoader(false);
        setSearchedCard(result.data?.data?.slice(0, 6));
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  const searchCards = async () => {
    setLoader(true);
    try {
      const result = await axios.get(
        `http://localhost:8000/api/v1/search-cards/${inputValue}`
      );
      setInitialMessage(false);
      setSearchedCard(result.data?.data);
    } catch (error) {
      console.log(error);
      setInitialMessage(false);
      setSearchedCard([]);
    } finally {
      setInitialMessage(false);
      setLoader(false);
    }
  };

  // useEffect(() => {
  //   if (inputValue?.length > 2) {
  //     // Clear the previous debounce timer
  //     if (debounceRef.current) {
  //       clearTimeout(debounceRef.current);
  //     }

  //     // Set a new debounce timer
  //     debounceRef.current = setTimeout(() => {
  //       searchCards();
  //     }, 500); // Adjust the delay time as needed (500ms here)
  //   } else {
  //     setSearchedCard([]);
  //   }

  //   // Cleanup on unmount
  //   return () => {
  //     if (debounceRef.current) {
  //       clearTimeout(debounceRef.current);
  //     }
  //   };
  // }, [inputValue]);

  useEffect(() => {
    getInitialCards();
  }, []);

  return (
    <div>
      <Head>
        <title>Help Center</title>
      </Head>
      <header className="flex justify-between p-4 text-white bg-black">
        <div className="flex items-center">
          {/* <img
            src="/abstract-logo.png"
            alt="Abstract Logo"
            className="h-6 mr-2"
          /> */}
          <FaFantasyFlightGames className="mr-3 text-4xl " />
          <h1 className="text-lg font-semibold">Abstract | Help Center</h1>
        </div>
        <button className="px-4 py-2 bg-gray-800 rounded">
          Submit a request
        </button>
      </header>

      <main className="text-center bg-gray-100 ">
        <div className="py-16 bg-purple-100 ">
          <h2 className="mb-6 text-4xl font-bold text-black">
            How can we help?
          </h2>
          <div className="relative max-w-xl mx-auto overflow-hidden border border-gray-400 rounded-lg shadow-lg ">
            <input
              type="text"
              placeholder={`Search eg-"title"`}
              onChange={(e) => {
                if (e.target.value?.length === 0) {
                  setInitialMessage(true);
                  getInitialCards();
                } else {
                  setInputValue(e.target.value);
                }
              }}
              className="w-full px-4 py-3 text-black outline-none"
            />
            <BsArrowRight
              onClick={() => {
                searchCards();
              }}
              className="absolute text-black cursor-pointer right-4 top-1/3"
            />
          </div>
        </div>

        <div className="">
          {loader ? (
            <div className="grid max-w-5xl grid-cols-1 gap-8 py-16 mx-auto md:grid-cols-2 lg:grid-cols-3">
              <div class="animate-pulse">
                <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div class="h-24 bg-gray-300 rounded"></div>
              </div>
              <div class="animate-pulse">
                <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div class="h-24 bg-gray-300 rounded"></div>
              </div>
              <div class="animate-pulse">
                <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div class="h-24 bg-gray-300 rounded"></div>
              </div>
              <div class="animate-pulse">
                <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div class="h-24 bg-gray-300 rounded"></div>
              </div>
              <div class="animate-pulse">
                <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div class="h-24 bg-gray-300 rounded"></div>
              </div>
              <div class="animate-pulse">
                <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div class="h-24 bg-gray-300 rounded"></div>
              </div>
            </div>
          ) : searchedCard?.length === 0 ? (
            <div className="flex flex-col justify-center h-[24rem] text-gray-300 ">
              <h2 className="text-2xl ">
                {initialMessage ? "Search Help" : " Data not found"}
              </h2>
            </div>
          ) : (
            <div className="grid max-w-5xl grid-cols-1 gap-8 py-16 mx-auto md:grid-cols-2 lg:grid-cols-3">
              {searchedCard.map((card, index) => (
                <div
                  key={index}
                  className="bg-gray-200 border border-gray-300 rounded-lg"
                >
                  <div className="items-start px-2 pt-2 border-b border-b-gray-300">
                    <h3 className="mb-2 font-medium text-black text-start">
                      {card.title}
                    </h3>
                  </div>
                  <div className="px-2 py-2 ">
                    <p className="text-sm text-gray-500 text-start ">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 text-white bg-black">
        <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto text-sm md:grid-cols-4">
          <div>
            <h4 className="font-semibold">Abstract</h4>
            <ul>
              <li>Branches</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Help Center</li>
              <li>Release Notes</li>
              <li>Status</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Community</h4>
            <ul>
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>Facebook</li>
              <li>Dribbble</li>
              <li>Podcast</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Legal</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>
            © Copyright 2022 Abstract Studio Design, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
