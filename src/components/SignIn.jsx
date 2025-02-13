import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button"; // Assuming Button component is correctly defined
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { message } from "antd";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: #431999;
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validate input fields
  const validateInputs = () => {
    if (!email || !password) {
      message.error("Please fill in all fields");
      return false;
    }
    return true;
  };

  // Handle form submit
  const handleSignIn = async (e) => {
    // e.preventDefault(); // Prevent default form submission behavior

    // Only proceed if inputs are validated
    if (!validateInputs()) return;

    setLoading(true);
    setButtonDisabled(true);

    try {
      const res = await UserSignIn({ email, password });
      dispatch(loginSuccess(res.data)); // Store user info in Redux
      message.success("Login successful!");
    } catch (err) {
      // Proper error handling
      const errorMessage = err.response?.data?.message || "Login failed";
      message.error(errorMessage);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to FlexTrack 👋</Title>
        <Span>Please login with your details here</Span>
      </div>
      <form onSubmit={handleSignIn}> {/* Form handling submit */}
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <TextInput
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            handleChange={(e) => setEmail(e.target.value)} // Ensure correct prop usage
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            password
            value={password}
            handleChange={(e) => setPassword(e.target.value)} // Ensure correct prop usage
          />
          <Button
            text="Sign In"
            type="submit" // Trigger form submission on click
            isLoading={loading}
            isDisabled={buttonDisabled}
            onClick={handleSignIn}
          />
        </div>
      </form>
    </Container>
  );
};

export default SignIn;
