import React, { useEffect, useState } from 'react';
import { useAppContext } from 'src/contexts/AppContext';
import { GetResources, NextStep, SendTrackingEvent, SetResources, StepBack } from 'src/services/SelfOnboarding';
import { StepForm } from './stepsStyles';


// add props to AdminInfoStep

interface AdminInfoStepProps {
  formData: {
    username?: string;
    password?: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    username?: string;
    password?: string;
  }>>;
}

export const AdminInfoStep: React.FC<AdminInfoStepProps> = ({ formData, setFormData }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <StepForm>
      <h2>Criar conta de administrador</h2>
      <label>Nome de usuário:</label>
      <input
        type="text"
        name="username"
        value={formData.username || ''}
        onChange={handleInputChange}
      />
      <label>Senha:</label>
      <input
        type="password"
        name="password"
        value={formData.password || ''}
        onChange={handleInputChange}
      />
    </StepForm>
  );
};