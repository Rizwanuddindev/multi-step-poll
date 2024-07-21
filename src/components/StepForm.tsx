import React, { useState } from 'react';
import Step from './Step';
import Summary from './Summary';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setAnswer } from '../redux/pollSlice';

interface Step {
  title: string;
  options: { icon: string; label: string }[];
}

const steps: Step[] = [
  { title: 'How was your week overall?', options: [{ icon: '👍', label: 'Like' }, { icon: '🤔', label: 'Thinking' }, { icon: '👎', label: 'Dislike' }] },
  { title: 'Describe your mood', options: [{ icon: '😊', label: 'Happy' }, { icon: '😢', label: 'Sad' }, { icon: '😠', label: 'Angry' }] },
  { title: 'Any feedback for us?', options: [{ icon: '✍️', label: 'Write' }, { icon: '💬', label: 'Speak' }, { icon: '📷', label: 'Capture' }] },
];

const StepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const answers = useSelector((state: RootState) => state.poll.answers);
  const dispatch = useDispatch();

  const handleOptionSelect = (stepIndex: number, option: { icon: string; label: string }) => {
    dispatch(setAnswer({ step: stepIndex, answer: option }));
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col items-center justify-center bg-blue-600 text-white">
        <div className="flex flex-col items-center mb-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`cursor-pointer mb-4 flex items-center ${index === currentStep ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setCurrentStep(index)}
              role="button"
              aria-label={step.title}
            >
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
          ))}
          <div
            className={`cursor-pointer flex items-center ${steps.length === currentStep ? 'opacity-100' : 'opacity-50'}`}
            onClick={() => setCurrentStep(steps.length)}
            role="button"
            aria-label="Summary"
          >
            <div className="w-4 h-4 rounded-full bg-white"></div>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 left-12">
            <h2 className="text-4xl w-40 ">{currentStep < steps.length ? steps[currentStep].title : 'Summary'}</h2>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-white transition-transform transform duration-500">
        {currentStep < steps.length ? (
          <div className="text-center">
            <Step
              step={steps[currentStep]}
              stepIndex={currentStep}
              onOptionSelect={handleOptionSelect}
              selectedOption={answers[currentStep]}
            />
          </div>
        ) : (
          <Summary answers={answers} />
        )}
      </div>
    </div>
  );
};

export default StepForm;
