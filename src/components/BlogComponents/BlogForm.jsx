import React, { useState } from 'react';
import styled from 'styled-components';
import Button from "../Button";
import { Add, Close } from '@mui/icons-material';

const FormContainer = styled.div`
  width: 90%;
  transition: all 0.3s ease;
  margin: 0 auto;
`;

const FormToggle = styled.div`
  width: 100%;
  padding: 16px;
  background: linear-gradient(
    135deg, 
    ${({ theme }) => theme.primary + "80"} 0%,
    ${({ theme }) => theme.secondary + "90"} 100%
  );
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ $isOpen }) => ($isOpen ? "20px" : "0")};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ToggleText = styled.h3`
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.bg} 0%,
    ${({ theme }) => theme.bg + "90"} 100%
  );
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.primary + "20"};
  max-height: ${({ $isOpen }) => ($isOpen ? "800px" : "0")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "50"};
  border-radius: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  background: transparent;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary + "20"};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "50"};
  border-radius: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  background: transparent;
  min-height: 150px;
  outline: none;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary + "20"};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const BlogForm = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    onSubmit(formData);
    setFormData({ title: "", content: "" });
    setIsOpen(false);
  };

  return (
    <FormContainer>
      <FormToggle onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <ToggleText>
          {isOpen ? <Close /> : <Add />}
          {isOpen ? 'Close Form' : 'Create New Blog'}
        </ToggleText>
      </FormToggle>

      <Form onSubmit={(e) => e.preventDefault()} $isOpen={isOpen}>
        <Input
          type="text"
          placeholder="Enter your blog title..."
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <TextArea
          placeholder="Write your blog content..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
        <ButtonContainer>
          <Button
            text="Cancel"
            onClick={() => setIsOpen(false)}
            type="secondary"
            outlined
          />
          <Button
            text="Create Blog"
            onClick={handleSubmit}
            type="primary"
          />
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default BlogForm;
