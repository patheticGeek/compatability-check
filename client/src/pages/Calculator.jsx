import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";

const Calculator = () => {
  const { referer } = useParams();
  const [crushOf, setCrushOf] = useState("");
  const [crushName, setCrushName] = useState("");
  const [compatibility, setCompatibility] = useState(null);

  const calculate = async (event) => {
    event.preventDefault();

    const random = Math.floor(Math.random() * 100);
    setCompatibility(random);
    try {
      await axios.post("/submit", {
        referer,
        crushName,
        crushOf,
        compatibility: random,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow m-auto">
      <h1 className="text-2xl text-center font-semibold mb-6 m-2">
        Calculate your compatibility
        <br />
        With your crush
      </h1>

      <form onSubmit={calculate}>
        <input
          className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 mt-3 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm select-all"
          placeholder="Your name"
          value={crushOf}
          onChange={(e) => setCrushOf(e.target.value)}
          required
        />

        <input
          className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 mt-3 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm select-all"
          placeholder="Your crush's name"
          value={crushName}
          onChange={(e) => setCrushName(e.target.value)}
          required
        />

        {compatibility ? (
          <p
            className={`my-2 px-2 text-center ${
              compatibility < 40
                ? "text-red-600"
                : compatibility < 80
                ? "text-yellow-600"
                : "text-green-800"
            }`}
          >
            {compatibility < 40
              ? "Hnmm honestly look somewhere else"
              : compatibility < 80
              ? "Shoot your shot"
              : "GO FUCKING PROPOSE RIGHT NOW!!!!"}
          </p>
        ) : (
          <button
            type="submit"
            className="mt-3 text-white w-full bg-indigo-700 rounded shadow py-2 px-3 text-center"
          >
            Calculate!
          </button>
        )}
      </form>
    </div>
  );
};

export default Calculator;
