import axios from "axios";

export const getFrontPageLeaderboard = async () => {
  try {
    const response = await axios.get("/frontpage-leaderboard");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
