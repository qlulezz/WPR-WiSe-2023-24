import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/ui/Button";
import axios from "../services/api/axios";
import { RootState, User, loginUser } from "../services/state/reducer";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

export default function LoginScreen() {
  const [err, setErr] = useState("");
  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch();
  const navigate = useNavigate();

  const user: User = useSelector((state: RootState) => {
    return state.user;
  });

  useEffect(() => {
    if (user.email) {
      navigate("/");
    }
  }, [navigate, user.email]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    axios
      .post("/login", { email, password }, { withCredentials: true })
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
      <h1>Login</h1>
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="email" name="email" placeholder="E-Mail" required />
          <input type="password" name="password" placeholder="Passwort" required />
          {err && <p className="error">{err}</p>}
          <Button type="primary">Anmelden</Button>
        </form>
        <div>
          <p>Noch keinen Account?</p>
          <Link to="/signup">Hier registrieren</Link>
        </div>
      </div>
    </div>
  );
}
