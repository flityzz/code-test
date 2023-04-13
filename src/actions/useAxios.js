import axios from "axios";

const useAxios = () => {
  return axios.create({
    baseURL: "https://dev.codeleap.co.uk/careers/",
  });
};

export { useAxios };
