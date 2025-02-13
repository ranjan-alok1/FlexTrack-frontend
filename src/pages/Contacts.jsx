import React, { useRef } from "react";
import styled from "styled-components";
import { message } from "antd";
import emailjs from 'emailjs-com';
import Button from "../components/Button"

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userID = process.env.REACT_APP_EMAILJS_USER_ID;
    console.log("Environment variables:", process.env);

    console.log(serviceID);
    console.log(templateID);
    console.log(userID);

    emailjs.sendForm(serviceID, templateID, form.current, userID)
      .then(() => {
        message.success('Message sent successfully!');
      }, () => {
        message.error('Failed to send the message, please try again.');
      });
      
    e.target.reset();
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact Me</Title>
        <Form ref={form} onSubmit={sendEmail}>
          <Input type="text" name="user_name" placeholder="Name" required />
          <Input type="email" name="user_email" placeholder="Email" required />
          <TextArea name="message" placeholder="Message" rows={10} required />
          <Button text="Send Message"
        medium type="submit">Send Message</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Contact;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  position: relative;
  z-index: 0;
  background: linear-gradient(135deg,
    #F4F7FE 0%,
    rgba(244, 247, 254, 0.95) 20%,
    rgba(237, 242, 255, 0.85) 50%,
    rgba(224, 231, 255, 0.75) 80%,
    #F4F7FE 100%
  );
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.9);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(112, 144, 176, 0.1);
  border: 1px solid rgba(112, 144, 176, 0.2);
  backdrop-filter: blur(20px);
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: #2B3674;
  margin-bottom: 24px;
  background: linear-gradient(90deg, #4318FF, #868CFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid rgba(112, 144, 176, 0.2);
  border-radius: 12px;
  font-size: 16px;
  color: #2B3674;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;

  &:focus {
    border-color: #4318FF;
    box-shadow: 0 0 0 3px rgba(67, 24, 255, 0.1);
    outline: none;
    background: rgba(255, 255, 255, 0.95);
  }

  &::placeholder {
    color: #A3AED0;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid rgba(112, 144, 176, 0.2);
  border-radius: 12px;
  font-size: 16px;
  color: #2B3674;
  background: rgba(255, 255, 255, 0.8);
  resize: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #4318FF;
    box-shadow: 0 0 0 3px rgba(67, 24, 255, 0.1);
    outline: none;
    background: rgba(255, 255, 255, 0.95);
  }

  &::placeholder {
    color: #A3AED0;
  }
`;
