import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const clubService = {
  getAvailableClubs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clubs/available`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  joinClub: async (clubId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/clubs/join/${clubId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  leaveClub: async (clubId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/clubs/leave/${clubId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getUserClubs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clubs/user`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default clubService;
