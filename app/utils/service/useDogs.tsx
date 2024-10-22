import { response } from "../helper/response";
import axiosInstance from "../axios";

export const dogApi = () => ({
  async getAllBreads() {
    try {
      const req = await axiosInstance.get("/breeds/list/all");
      return response(req, null);
    } catch (error) {
      return response(null, error);
    }
  },
  getRandom: () => ({
    async getRandomImage(count = "") {
      try {
        const req = await axiosInstance.get(`/breeds/image/random/${count}`);
        return response(req, null);
      } catch (error) {
        return response(null, error);
      }
    },
    async getRandomImagesFromBreed(breed, count = "") {
      try {
        const req = await axiosInstance.get(
          `breed/${breed}/images/random/${count}`
        );
        return response(req, null);
      } catch (error) {
        return response(null, error);
      }
    },
  }),
  async getAllImagesInABreed(breed) {
    try {
      const req = await axiosInstance.get(`breed/${breed}/images`);
      return response(req, null);
    } catch (error) {
      return response(null, error);
    }
  },
});