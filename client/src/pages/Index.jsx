import React from "react";
import { Link } from "react-router-dom";
import UserDetails from "../component/UserDetails";
import { useLoginState } from "../state";

const Index = () => {
  const { loggedIn } = useLoginState();

  return (
    <div className="w-full min-h-full flex">
      {loggedIn ? (
        <UserDetails />
      ) : (
        <div className="bg-white rounded-lg p-6 shadow m-auto">
          <h1 className="text-2xl text-center font-semibold mb-6">
            Get started by creating an account
          </h1>

          <Link
            to="/signup"
            className="w-full inline-flex justify-center mt-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Create an account &rarr;
          </Link>

          <Link
            to="/login"
            className="w-full inline-flex justify-center mt-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Sign in &rarr;
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;
