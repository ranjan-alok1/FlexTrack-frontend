
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
  background-color: #f0f0f0;
  min-height: 70vh;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  resize: none;
`;
