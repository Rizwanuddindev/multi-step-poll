import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Option {
  icon: string;
  label: string;
}

interface PollState {
  answers: Option[];
}

const initialState: PollState = {
  answers: [],
};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setAnswer: (state: { answers: { [x: string]: any; }; }, action: PayloadAction<{ step: number; answer: Option }>) => {
      state.answers[action.payload.step] = action.payload.answer;
    },
  },
});

export const { setAnswer } = pollSlice.actions;
export default pollSlice.reducer;
