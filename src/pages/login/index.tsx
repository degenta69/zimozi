import RegistrationForm from "@/components/user/RegistrationForm";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registration, setRegistration] = useState(false);

  const { handleGoogleLogin, error, handleLogin, handleRegister, user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      nav("/");
    }
  }, [user]);

  return (
    <>
      <RegistrationForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        registration={registration}
        setRegistration={setRegistration}
        error={error}
        handleGoogleLogin={handleGoogleLogin}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
    </>
  );
}
