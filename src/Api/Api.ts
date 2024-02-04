/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getTokenFromLocalStorage } from "../Storage/Token.ts";
import { toast } from "react-toastify";

class Api {
  protected static base_url: string = "https://vercel-backend-one-roan.vercel.app/mobile";

  protected static post(url: string, data?: any) {
    toast.loading('pending ...')
    const response = axios.post(this.base_url + url, data, {
      headers: {
        Authorization: "Bearer " + getTokenFromLocalStorage(),
      },
    });
    return response;
  }
}

export default Api;
