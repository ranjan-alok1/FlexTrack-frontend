import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Label = styled.label`
  font-size: 15px;
  color: ${({ theme }) => theme.secondary};
`;

const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.secondary + 50};
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  background: transparent;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Select = styled.select`
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  background: transparent;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  margin-top: 2px;
`;

const AddWorkout = ({ addNewWorkout, buttonLoading }) => {
  const [formData, setFormData] = useState({
    category: "Legs",
    workoutName: "",
    sets: "",
    reps: "",
    weight: "",
    duration: ""
  });

  const handleSubmit = () => {
    // Convert form data to required string format
    const workoutString = `#${formData.category}
-${formData.workoutName}
-${formData.sets} setsX${formData.reps} reps
-${formData.weight} kg
-${formData.duration} min`;

    addNewWorkout(workoutString);
    
    // Reset form after submission
    setFormData({
      category: "Legs",
      workoutName: "",
      sets: "",
      reps: "",
      weight: "",
      duration: ""
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container>
      <Title>Add Workout</Title>
      <Form>
        <InputGroup>
          <Label>Category</Label>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Legs">Legs</option>
            <option value="Arms">Arms</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Core">Core</option>
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>Workout Name</Label>
          <Input
            type="text"
            name="workoutName"
            value={formData.workoutName}
            onChange={handleChange}
            placeholder="e.g., Back Squat"
            required
          />
        </InputGroup>

        <div style={{ display: 'flex', gap: '10px' }}>
          <InputGroup style={{ flex: 1 }}>
            <Label>Sets</Label>
            <Input
              type="number"
              name="sets"
              value={formData.sets}
              onChange={handleChange}
              placeholder="e.g., 5"
              required
            />
          </InputGroup>

          <InputGroup style={{ flex: 1 }}>
            <Label>Reps</Label>
            <Input
              type="number"
              name="reps"
              value={formData.reps}
              onChange={handleChange}
              placeholder="e.g., 15"
              required
            />
          </InputGroup>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <InputGroup style={{ flex: 1 }}>
            <Label>Weight (kg)</Label>
            <Input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g., 30"
              required
            />
          </InputGroup>

          <InputGroup style={{ flex: 1 }}>
            <Label>Duration (min)</Label>
            <Input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 10"
              required
            />
          </InputGroup>
        </div>

        <ButtonContainer>
          <Button
            text="Add Workout"
            onClick={handleSubmit}
            isLoading={buttonLoading}
            isDisabled={buttonLoading}
            fullWidth
          />
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default AddWorkout;
