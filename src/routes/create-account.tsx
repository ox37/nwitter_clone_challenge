import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  AuthForm,
  AuthError,
  AuthInput,
  AuthSwitcher,
  AuthTitle,
  AuthWrapper,
  AuthSignUpTitle,
} from "../components/auth-components";
import GithubLoginButton from "../components/github-login-button";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isLoading || name === "" || email === "" || password === "") return;

    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);

      await updateProfile(credentials.user, {
        displayName: name,
      });

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
      <AuthSignUpTitle>Sign up</AuthSignUpTitle>
      <AuthForm onSubmit={onSubmit}>
        <AuthInput
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
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
        <AuthInput
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </AuthForm>
      {error !== "" ? <AuthError>{error}</AuthError> : null}
      <AuthSwitcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </AuthSwitcher>
      <GithubLoginButton />
    </AuthWrapper>
  );
}
