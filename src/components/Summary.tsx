import React from 'react';
import axios from 'axios';

interface Option {
  icon: string;
  label: string;
}

interface SummaryProps {
  answers: Option[];
}

const Summary: React.FC<SummaryProps> = ({ answers }) => {
  const submitData = () => {
    axios.post('https://jsonplaceholder.typicode.com/posts', { answers })
      .then(response => console.log('Data submitted', response))
      .catch(error => console.error('Error submitting data', error));
  };

  return (
    <div className="flex flex-col items-center animate-reveal-left">
      <h2 className="text-3xl mb-4">Summary</h2>
      <ul className="list-disc list-inside">
        {answers.map((answer, index) => (
          <li key={index} className="text-xl">
            Step {index + 1}: {answer.label}
          </li>
        ))}
      </ul>
      <button onClick={submitData} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Submit</button>
    </div>
  );
};

export default Summary;
