import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.secondary};
  }

  &:disabled {
    background: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button; 