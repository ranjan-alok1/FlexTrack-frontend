import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";
import { message } from "antd";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 16px;
  overflow-y: scroll;
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
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(112, 144, 176, 0.12);
  height: fit-content;
  margin-bottom: 16px;
  border: 1px solid rgba(112, 144, 176, 0.2);

  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  background: linear-gradient(90deg, #4318FF, #868CFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  min-height: fit-content;

  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0px 4px;
  min-height: fit-content;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(112, 144, 176, 0.08);
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
  margin-bottom: 16px;
  min-height: fit-content;

  & > * {
    width: 280px;
    flex: 0 0 280px;
    height: 200px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(112, 144, 176, 0.1);
    border: 1px solid rgba(112, 144, 176, 0.15);
    backdrop-filter: blur(10px);
  }

  @media (max-width: 1200px) {
    & > * {
      width: 260px;
      flex: 0 0 260px;
    }
  }

  @media (max-width: 600px) {
    & > * {
      width: 100%;
      flex: 0 0 100%;
    }
  }
`;
const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4318FF;
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);

  const dashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("flextrack-app-token");
      const res = await getDashboardDetails(token);
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching dashboard details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTodaysWorkout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("flextrack-app-token");
      const res = await getWorkouts(token, "");
      setTodaysWorkouts(res?.data?.todaysWorkouts || []);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching today's workouts:", error);
    } finally {
      setLoading(false);
    }
  };
  const addNewWorkout = async (workoutString) => {
    setButtonLoading(true);
    const token = localStorage.getItem("flextrack-app-token");
    await addWorkout(token, { workoutString })
      .then((res) => {
        dashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  return (
    <Container>
      {loading ? (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      ) : (
        <Wrapper>
          <Title>Dashboard</Title>
          <FlexWrap>
            {counts.map((item) => (
              <CountsCard item={item} data={data} />
            ))}
          </FlexWrap>

          <FlexWrap>
            <WeeklyStatCard data={data} />
            <CategoryChart data={data} />
            <AddWorkout
              addNewWorkout={addNewWorkout}
              buttonLoading={buttonLoading}
            />
          </FlexWrap>

          <Section>
            <Title>Today's Workouts</Title>
            <CardWrapper>
              {todaysWorkouts.map((workout, index) => (
                <WorkoutCard 
                  key={workout._id} 
                  workout={workout} 
                  index={index}
                />
              ))}
            </CardWrapper>
          </Section>
        </Wrapper>
      )}
    </Container>
  );
};

export default Dashboard;
