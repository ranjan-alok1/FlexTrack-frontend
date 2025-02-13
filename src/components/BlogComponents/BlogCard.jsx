import React, { useState } from "react";
import styled from "styled-components";
import { Person, AccessTime } from '@mui/icons-material';
import BlogModal from './BlogModal';

// Array of gradient combinations
const gradients = [
  {
    start: "#FF416C",
    end: "#FF4B2B"
  },
  {
    start: "#4776E6",
    end: "#8E54E9"
  },
  {
    start: "#00B4DB",
    end: "#0083B0"
  },
  {
    start: "#834D9B",
    end: "#D04ED6"
  },
  {
    start: "#1D976C",
    end: "#93F9B9"
  }
];

// Helper function to format date
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const Card = styled.div`
  background: linear-gradient(
    135deg,
    ${({ $gradient }) => $gradient.start + "20"} 0%,
    ${({ $gradient }) => $gradient.end + "30"} 100%
  );
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ $gradient }) => $gradient.start} 0%,
      ${({ $gradient }) => $gradient.end} 100%
    );
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text_primary};
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 1.3;
`;

const Content = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const MetaData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + "20"};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;

  svg {
    font-size: 16px;
  }
`;

const TimeInfo = styled(AuthorInfo)``;

const BlogCard = ({ blog, index }) => {
  // Use modulo to cycle through gradients
  const gradient = gradients[index % gradients.length];
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Truncate content to show first 10 words
  const truncateContent = (text) => {
    const words = text.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return text;
  };

  return (
    <>
      <Card 
        $gradient={gradient}
        onClick={() => setIsModalOpen(true)}
      >
        <Title>{blog.title}</Title>
        <Content $gradient={gradient}>
          {truncateContent(blog.content)}
        </Content>
        <MetaData>
          <AuthorInfo>
            <Person />
            {blog.author?.name || "Anonymous"}
          </AuthorInfo>
          <TimeInfo>
            <AccessTime />
            {formatDate(blog.createdAt)}
          </TimeInfo>
        </MetaData>
      </Card>
      {isModalOpen && (
        <BlogModal 
          blog={blog} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default BlogCard;
