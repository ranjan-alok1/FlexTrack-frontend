import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { getWorkouts } from "../api";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
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
  flex: 1;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 0.2;
  height: fit-content;
  padding: 18px;
  border: 1px solid rgba(112, 144, 176, 0.2);
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(112, 144, 176, 0.1);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #4318FF;
  margin-bottom: 12px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const Right = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(112, 144, 176, 0.08);
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  width: 100%;

  & > * {
    width: 350px;
    flex: 0 0 350px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(112, 144, 176, 0.1);
    border: 1px solid rgba(112, 144, 176, 0.15);
    backdrop-filter: blur(10px);
  }

  @media (max-width: 600px) {
    gap: 12px;
    & > * {
      width: 100%;
      flex: 0 0 100%;
    }
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const SecTitle = styled.div`
  font-size: 22px;
  color: #2B3674;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Workouts = () => {
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const getTodaysWorkout = React.useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("flextrack-app-token");
    await getWorkouts(token, date ? `?date=${date}` : "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      console.log(res.data);
      setLoading(false);
    });
  }, [date]);

  const handleWorkoutClick = (workout) => {
    console.log("Workout clicked:", workout);
    // Add your workout click handling logic here
  };

  useEffect(() => {
    getTodaysWorkout();
  }, [getTodaysWorkout]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Select Date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={(e) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)}
            />
          </LocalizationProvider>
        </Left>
        <Right>
          <Section>
            <SecTitle>Today's Workout</SecTitle>
            {loading ? (
              <CircularProgress />
            ) : (
              <CardWrapper>
                {todaysWorkouts.map((workout, index) => (
                  <WorkoutCard
                    key={workout._id}
                    workout={workout}
                    index={index}
                    onClick={() => handleWorkoutClick(workout)}
                  />
                ))}
              </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;
