import React from "react";
import styled from "styled-components";
import BlogCard from "./BlogCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  padding: 20px 0;
  width: 90%;
  margin: 0 auto;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  width: 90%;
  margin: 20px auto;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  width: 90%;
  margin: 0 auto;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.card_light} 0%,
    ${({ theme }) => theme.card_dark} 100%
  );
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h3 {
    color: ${({ theme }) => theme.text_primary};
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const BlogList = ({ blogs, loading }) => {
  if (loading) {
    return <LoadingText>Loading amazing blogs...</LoadingText>;
  }

  if (!blogs || blogs.length === 0) {
    return (
      <EmptyState>
        <h3>No Blogs Found</h3>
        <p>Be the first one to create a blog!</p>
      </EmptyState>
    );
  }

  return (
    <Container>
      {blogs.map((blog, index) => (
        <BlogCard key={blog._id} blog={blog} index={index} />
      ))}
    </Container>
  );
};

export default BlogList;
