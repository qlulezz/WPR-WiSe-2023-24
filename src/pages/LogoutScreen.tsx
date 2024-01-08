import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState, logoutUser } from "../services/state/reducer";
import { useDispatch } from "react-redux";
import axios from "../services/api/axios";
import { AxiosError } from "axios";

export default function LogoutScreen() {
  const [err, setErr] = useState("");
  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("/logout", { withCredentials: true })
      .then(() => {
        dispatch(logoutUser());
        navigate("/");
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          setErr(err.response.data as string);
          return;
        }
        setErr(err.message);
      });
  }, [dispatch, navigate]);

  return (
    <>
      <p style={{ margin: "1rem" }}>Du wirst abgemeldet. Bitte einen Moment Geduld ...</p>
      {err && <p className="error">{err}</p>}
    </>
  );
}
