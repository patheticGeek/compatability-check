import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useLoginState } from "../state";

const UserDetails = () => {
  const { user } = useLoginState();
  const [friendData, setFriendData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("/friend-data");
      setFriendData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => fetchData(), []);

  return (
    <div className="flex h-full w-full flex-col md:flex-row justify-around items-center">
      <div className="bg-white rounded-lg p-6 shadow my-auto">
        <h1 className="text-2xl text-center font-semibold mb-6 m-4">
          Welcome, {user.name}!
        </h1>

        <input
          className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm select-all"
          readOnly
          value={`${window.location.origin}/c/${user.referer}`}
        />

        <p className="mt-2">
          Share this link with your friends and have fun :)
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow my-auto h-[90vh] w-full md:w-2/4 overflow-auto m-4 flex flex-col">
        {friendData ? (
          <>
            <div
              className={`border-b border-gray-300 px-4 py-3 flex items-center font-semibold`}
            >
              <div className="flex-1">Friend name</div>
              <div className="flex-1">Crush Name</div>
              <div className="flex-1">Compatibility</div>
            </div>
            {friendData.map((item, index) => (
              <div
                key={item._id}
                className={`border-b border-gray-300 px-4 py-3 flex items-center ${
                  index % 2 === 0 && "bg-gray-100"
                }`}
              >
                <div className="flex-1">{item.crushOf}</div>
                <div className="flex-1">{item.crushName}</div>
                <div className="flex-1">{item.compatibility}</div>
              </div>
            ))}
          </>
        ) : (
          <svg
            class="animate-spin m-auto h-8 w-8 text-purple-800"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
