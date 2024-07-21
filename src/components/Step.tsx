import React from 'react';

interface Option {
  icon: string;
  label: string;
}

interface StepProps {
  step: {
    title: string;
    options: Option[];
  };
  stepIndex: number;
  onOptionSelect: (stepIndex: number, option: Option) => void;
  selectedOption: Option | undefined;
}

const Step: React.FC<StepProps> = ({ step, stepIndex, onOptionSelect, selectedOption }) => {
  return (
    <div className="flex space-x-8">
      {step.options.map((option, index) => (
        <div
          key={index}
          className={`flex flex-col items-center cursor-pointer ${selectedOption === option ? 'text-blue-500' : 'text-gray-500'}`}
          onClick={() => onOptionSelect(stepIndex, option)}
        >
          <span className="text-6xl">{option.icon}</span>
          <span className={`mt-2 transition-opacity ${selectedOption === option ? 'opacity-100' : 'opacity-0'}`}>
            {option.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Step;
