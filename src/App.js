import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Contacts from "./pages/Contacts";
import BlogPage from "./pages/BlogPage";
import React, { Suspense } from 'react';

const Navbar = React.lazy(() => import('./components/Navbar'));

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;
  ${props => props.$isAuthenticated && `
    padding-top: 80px;
  `}
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container $isAuthenticated={true}>
            <Suspense fallback={<div></div>}>
              {currentUser && <Navbar currentUser={currentUser} />}
            </Suspense>
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/contact" exact element={<Contacts />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        ) : (
          <Container $isAuthenticated={false}>
            <Authentication />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
