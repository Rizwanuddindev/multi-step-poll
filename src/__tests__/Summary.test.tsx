import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Summary from '../components/Summary';

jest.mock('axios');

const mockAnswers = [
  { icon: '👍', label: 'Like' },
  { icon: '😊', label: 'Happy' },
  { icon: '✍️', label: 'Write' },
];

test('renders Summary and submits data', async () => {
  (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ data: 'success' });

  render(<Summary answers={mockAnswers} />);

  // Verify that the summary displays the selected options
  expect(screen.getByText(/Step 1: Like/i)).toBeInTheDocument();
  expect(screen.getByText(/Step 2: Happy/i)).toBeInTheDocument();
  expect(screen.getByText(/Step 3: Write/i)).toBeInTheDocument();

  // Click the submit button
  fireEvent.click(screen.getByText(/Submit/i));

  // Verify that the axios.post function was called with the correct arguments
  expect(axios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', { answers: mockAnswers });

  // Verify that the axios.post function was called once
  expect(axios.post).toHaveBeenCalledTimes(1);
});
