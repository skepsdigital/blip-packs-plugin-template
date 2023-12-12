import React, { useEffect, useState } from 'react';
import { useAppContext } from 'src/contexts/AppContext';
import { GetResources, NextStep, SendTrackingEvent, SetResources, StepBack } from 'src/services/SelfOnboarding';
import { HomeContainer } from './styles';
import { AdminInfoStep } from '../AdminInfoStep';
import { InsuranceStep } from '../InsuranceStep';

export const Home: React.FC = () => {
    const { isSelfOnboarding } = useAppContext();
    const [currentStep, setCurrentStep] = useState(1);
    const [tipoTela, setTipoTela] = useState<string>('');
    const [formData, setFormData] = useState({});

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
          case 1:
            return <AdminInfoStep formData={formData} setFormData={setFormData} />;
          case 2:
            return <InsuranceStep formData={formData} setFormData={setFormData} />;
          default:
            return null;
        }
      };
    
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === 2;

    useEffect(() => {
        setTipoTela(isSelfOnboarding ? 'SelfOnboarding' : 'Central de Packs');
    }, [isSelfOnboarding, setTipoTela]);

    const handleGetResource = async () => {
        const resource = await GetResources('skepsqmqd');
        console.log('Recurso recuperado: ', resource);
    };

    const handleSetResources = async () => {
        const status = await SetResources('skepsqmqd', [
            {
                name: 'recurso1',
                value: 'RECURSO 1',
                type: 'application/txt',
            },
            {
                name: 'recurso2',
                value: '{"valor": 1.00}',
                type: 'application/json',
            },
        ]);

        console.log('Recurso setado', status);
    };

    const handleSendTracking = async () => {
        await SendTrackingEvent('meu-evento-da-minha-secao', {
            buttonName: 'sendtracking',
        });
    };

    const handleMoveNext = async () => {
        await NextStep();
    };
    const handleMovePrevious = async () => {
        await StepBack();
    };

    const handleSave = () => {
        // Handle save logic here with formData
        console.log('Form data saved:', formData);
    };

    return (
        <HomeContainer>
            <bds-paper elevation="secondary">
                <h1>Plugin de configuração</h1>

                {renderStep()}

                {!isFirstStep && (
                    <button type="button" onClick={handlePrevious}>
                    Previous
                    </button>
                )}

                {isLastStep ? (
                    <button type="button" onClick={handleSave}>
                    Save
                    </button>
                ) : (
                    <button type="button" onClick={handleNext}>
                    Next
                    </button>
                )}

                {/* <span>
                    <strong>Tela: {tipoTela}</strong>
                </span> */}
                <br />
                {/* <h3>Exemplo de eventos:</h3>
                <div id="buttons">
                    <bds-button onClick={handleGetResource}>Get Resource</bds-button>
                    &nbsp;&nbsp;
                    <bds-button onClick={handleSetResources}>Set Resource</bds-button>
                    &nbsp;&nbsp;
                    <bds-button onClick={handleSendTracking}>Send Tracking</bds-button>
                    &nbsp;&nbsp;
                    <bds-button onClick={handleMoveNext}>Next Step</bds-button>
                    &nbsp;&nbsp;
                    <bds-button onClick={handleMovePrevious}>Step Back</bds-button>
                </div> */}
            </bds-paper>
        </HomeContainer>
    );
};
