import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  AuthError,
  AuthForm,
  AuthInput,
  AuthLoginTitle,
  AuthSwitcher,
  AuthTitle,
  AuthWrapper,
} from "../components/auth-components";
import GithubLoginButton from "../components/github-login-button";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isLoading || email === "" || password === "") return;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <AuthTitle>family story</AuthTitle>
      <AuthLoginTitle>Log in</AuthLoginTitle>
      <AuthForm onSubmit={onSubmit}>
        <AuthInput
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <AuthInput
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <AuthInput type="submit" value={isLoading ? "Loading..." : "Log in"} />
      </AuthForm>
      {error !== "" ? <AuthError>{error}</AuthError> : null}
      <AuthSwitcher>
        Don't have an account?{" "}
        <Link to="/create-account">Create one &rarr;</Link>
      </AuthSwitcher>
      <GithubLoginButton />
    </AuthWrapper>
  );
}
