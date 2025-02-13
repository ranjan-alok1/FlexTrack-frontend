import { FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: linear-gradient(
    135deg,
    ${({ $gradient, theme }) => theme.gradients[$gradient].start + "20"} 0%,
    ${({ $gradient, theme }) => theme.gradients[$gradient].end + "30"} 100%
  );
  width: 100%;
  border-radius: 10px;
  padding: 12px 20px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ $gradient, theme }) => theme.gradients[$gradient].start} 0%,
      ${({ $gradient, theme }) => theme.gradients[$gradient].end} 100%
    );
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;
const Category = styled.div`
  width: fit-content;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  background: ${({ theme }) => theme.primary + 20};
  padding: 4px 10px;
  border-radius: 8px;
  margin-bottom: 4px;
`;
const Name = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;
const Sets = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  display: flex;
  gap: 6px;
`;
const Flex = styled.div`
  display: flex;
  gap: 16px;
`;
const Details = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const WorkoutCard = ({ workout, index = 0, onClick }) => {
  const gradientTypes = ['red', 'purple', 'blue', 'violet', 'green'];
  const gradientType = gradientTypes[index % gradientTypes.length];

  return (
    <Card onClick={onClick} $gradient={gradientType}>
      <Category>#{workout?.category}</Category>
      <Name>{workout?.workoutName}</Name>
      <Sets>
        Count: {workout?.sets} sets X {workout?.reps} reps
      </Sets>
      <Flex>
        <Details>
          <FitnessCenterRounded sx={{ fontSize: "20px" }} />
          {workout?.weight} kg
        </Details>
        <Details>
          <TimelapseRounded sx={{ fontSize: "20px" }} />
          {workout?.duration} min
        </Details>
      </Flex>
    </Card>
  );
};

export default WorkoutCard;
