import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/ui/Button";
import axios from "../services/api/axios";
import { useEffect, useState } from "react";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState, User } from "../services/state/reducer";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/state/reducer";
import { AxiosError } from "axios";

export default function RegisterScreen() {
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const user: User = useSelector((state: RootState) => {
    return state.user;
  });

  useEffect(() => {
    if (user.email) {
      navigate("/");
    }
  }, [navigate, user.email]);

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const repeat = e.currentTarget.repeat.value;

    if (password !== repeat) {
      setErr("Passwörter stimmen nicht überein.");
      return;
    }

    // Required properties for server
    const user = {
      firstname: "none",
      lastname: "none",
      street: "none",
      postcode: "none",
      city: "none",
      country: "none",
      phone: "none",
      email: email,
      password: password,
    };

    axios
      .post("/signup", user, { withCredentials: true })
      .then(() => {
        dispatch(
          loginUser({
            email: email,
          })
        );
        navigate("/");
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          setErr(err.response.data as string);
          return;
        }
        setErr(err.message);
      });
  };

  return (
    <div className="layout">
      <Navbar />
      <h1>Signup</h1>
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="email" name="email" placeholder="E-Mail" required />
          <input type="password" name="password" placeholder="Passwort" required />
          <input type="password" name="repeat" placeholder="Passwort wiederholen" required />
          {err && <p className="error">{err}</p>}
          <Button type="primary">Registrieren</Button>
        </form>
        <div>
          <p>Schon einen Account?</p>
          <Link to="/login">Hier anmelden</Link>
        </div>
      </div>
    </div>
  );
}
