import React from "react";
import styled from "styled-components";
import { Close, Person, AccessTime } from '@mui/icons-material';
import { formatDate } from './BlogCard';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 20px;
  padding: 32px;
  position: relative;
  overflow-y: auto;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid ${({ theme }) => theme.primary + "20"};
  animation: modalSlideIn 0.3s ease;

  @keyframes modalSlideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.text_secondary + "20"};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text_primary};
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.3;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 24px;
  white-space: pre-wrap;
`;

const MetaData = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + "20"};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;

  svg {
    font-size: 18px;
  }
`;

const BlogModal = ({ blog, onClose }) => {
  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
        <Title>{blog.title}</Title>
        <Content>{blog.content}</Content>
        <MetaData>
          <MetaItem>
            <Person />
            {blog.author?.name || "Anonymous"}
          </MetaItem>
          <MetaItem>
            <AccessTime />
            {formatDate(blog.createdAt)}
          </MetaItem>
        </MetaData>
      </ModalContainer>
    </Overlay>
  );
};

export default BlogModal; 