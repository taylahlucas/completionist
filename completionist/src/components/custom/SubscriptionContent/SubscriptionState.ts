import { createSlice } from '@reduxjs/toolkit';
import { SubscriptionOptionsListProps } from './hooks/useGetSubscriptionOptionsList';
// import { SubscriptionTypeEnum } from '@utils/CustomEnums';

export interface SubscriptionState {
    readonly selectedSubscription: SubscriptionOptionsListProps;
};

export const initialState: SubscriptionState = {
    selectedSubscription: {
			id: '234',
			prices: [],
			title: '',
			description: []
		}
};

const slice = createSlice({
  name: 'subscription',
  initialState: initialState,
  reducers: {
    setSelectedSubscription: (state, action) => {
      state.selectedSubscription = action.payload;
    }
  }
});

export const {
    setSelectedSubscription
} = slice.actions;

export default slice.reducer;