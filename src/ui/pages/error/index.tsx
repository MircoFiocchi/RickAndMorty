"use client";
import React from "react";

import { useRouter } from "next/navigation";

import Lottie from "lottie-react";
import Morty from "@/src/assets/animations/Morty.json";

interface ErrorPageProps {
  is404?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ is404 = false }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <section className="bg-white h-screen dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <Lottie animationData={Morty} loop style={{ height: 300 }} />
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            {is404 ? "404" : "Error!"}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            {is404 ? "Page not found." : "An error occurred."}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {is404
              ? "The page you are looking for does not exist."
              : "Please try again."}
          </p>
          <button
            onClick={handleRedirect}
            className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Go to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
