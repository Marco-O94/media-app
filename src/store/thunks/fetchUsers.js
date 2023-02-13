import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:3005/";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get(baseUrl + "users");
  // Dev only!!
  await pause(1000);
  return response.data;
});

// DEV ONLY!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };
