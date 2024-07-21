import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import StepForm from '../components/StepForm';

const steps = [
  { title: 'How was your week overall?', options: [{ icon: '👍', label: 'Like' }, { icon: '🤔', label: 'Thinking' }, { icon: '👎', label: 'Dislike' }] },
  { title: 'Describe your mood', options: [{ icon: '😊', label: 'Happy' }, { icon: '😢', label: 'Sad' }, { icon: '😠', label: 'Angry' }] },
  { title: 'Any feedback for us?', options: [{ icon: '✍️', label: 'Write' }, { icon: '💬', label: 'Speak' }, { icon: '📷', label: 'Capture' }] },
];

test('renders StepForm and navigates through steps', () => {
  render(
    <Provider store={store}>
      <StepForm />
    </Provider>
  );

  // Verify that the first step is displayed
  expect(screen.getByText(/How was your week overall\?/i)).toBeInTheDocument();

  // Select an option for the first step
  fireEvent.click(screen.getByText(/👍/i));

  // Navigate to the second step by clicking the second step indicator
  fireEvent.click(screen.getByRole('button', { name: /Describe your mood/i }));
  expect(screen.getByText(/Describe your mood/i)).toBeInTheDocument();

  // Select an option for the second step
  fireEvent.click(screen.getByText(/😊/i));

  // Navigate to the third step by clicking the third step indicator
  fireEvent.click(screen.getByRole('button', { name: /Any feedback for us\?/i }));
  expect(screen.getByText(/Any feedback for us\?/i)).toBeInTheDocument();

  // Select an option for the third step
  fireEvent.click(screen.getByText(/✍️/i));

  // Navigate to the summary by clicking the summary step indicator
  fireEvent.click(screen.getByRole('button', { name: /Summary/i }));

  // Verify that the summary displays the selected options
  expect(screen.getAllByText(/Summary/i)[1]).toBeInTheDocument(); // Second instance of "Summary"
  expect(screen.getByText(/Step 1: Like/i)).toBeInTheDocument();
  expect(screen.getByText(/Step 2: Happy/i)).toBeInTheDocument();
  expect(screen.getByText(/Step 3: Write/i)).toBeInTheDocument();

  // Verify that the submit button is present
  expect(screen.getByText(/Submit/i)).toBeInTheDocument();
});
