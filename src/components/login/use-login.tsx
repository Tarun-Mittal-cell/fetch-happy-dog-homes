import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    console.log(email, name);
    const res = await axios({
      method: "POST",
      url: "https://frontend-take-home-service.fetch.com/auth/login",
      data: {
        email,
        name,
      },
      withCredentials: true,
    });
    console.log({ res });
    navigate("search");
  };

  return {
    email,
    setEmail,
    name,
    setName,
    onSubmit,
  };
};
