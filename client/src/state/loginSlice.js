import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loggedIn: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

// basically a smaller version of old vanilla redux

// const login = (user) => {
//   return { type: "login/login", payload: user };
// };

// const reducer = (state = { loggedIn: false, user: null }, action) => {
//   if (action.type === "login/login") {
//     return { ...state, ...action.payload };
//   }

//   return state;
// };

const { actions, reducer } = loginSlice;
export const { login, logout } = actions;

export const useLoginState = () => {
  const state = useSelector((state) => state.login);
  const dispatch = useDispatch();

  return {
    ...state,
    // wrap the actions in dispatch so we dont have
    // to do that where we want to use them
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
  };
};

export default reducer;
