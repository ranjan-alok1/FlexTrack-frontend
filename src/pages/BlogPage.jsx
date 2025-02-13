import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getAllBlogs, createBlog } from "../api";
import BlogList from "../components/BlogComponents/BlogList";
import BlogForm from "../components/BlogComponents/BlogForm";

const Container = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  width: 90%;
  text-align: center;
  margin-bottom: 12px;
  background: linear-gradient(90deg, #4318FF, #868CFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LoginMessage = styled.p`
  width: 90%;
  text-align: center;
  color: #A3AED0;
  padding: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(112, 144, 176, 0.2);
  border-radius: 16px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(112, 144, 176, 0.1);
  font-size: 16px;
  line-height: 1.5;

  @media (max-width: 600px) {
    padding: 20px;
    font-size: 14px;
  }
`;

const BlogWrapper = styled.div`
  width: 90%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(112, 144, 176, 0.12);
  border: 1px solid rgba(112, 144, 176, 0.2);

  @media (max-width: 600px) {
    padding: 16px;
    gap: 16px;
  }
`;

const BlogSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(112, 144, 176, 0.08);
`;

const BlogCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;

  & > * {
    width: 100%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(112, 144, 176, 0.1);
    border: 1px solid rgba(112, 144, 176, 0.15);
    backdrop-filter: blur(10px);
    padding: 20px;
  }

  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser?.token || localStorage.getItem("flextrack-app-token");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();
      if (response.success && Array.isArray(response.blogs)) {
        setBlogs(response.blogs);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async (blogData) => {
    try {
      console.log('Creating blog with data:', blogData);
      console.log('User token:', token);
      if (!token) {
        throw new Error('No authentication token found');
      }
      await createBlog(token, blogData);
      console.log('Blog created successfully');
      fetchBlogs();
    } catch (error) {
      console.error("Error creating blog:", error.response?.data || error.message);
      alert("Error creating blog. Please make sure you're logged in.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Container>
      <Title>Blogs</Title>
      <BlogWrapper>
        <BlogSection>
          {token ? (
            <BlogForm onSubmit={handleCreateBlog} />
          ) : (
            <LoginMessage>Please log in to create blogs</LoginMessage>
          )}
        </BlogSection>
        <BlogSection>
          <Title>Recent Blogs</Title>
          <BlogCardWrapper>
            <BlogList blogs={blogs} loading={loading} />
          </BlogCardWrapper>
        </BlogSection>
      </BlogWrapper>
    </Container>
  );
};

export default BlogPage;
