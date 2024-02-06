import { createSlice } from '@reduxjs/toolkit';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

export interface SubscriptionState {
    readonly selectedSubscription: SubscriptionTypeEnum;
};

export const initialState: SubscriptionState = {
    selectedSubscription: SubscriptionTypeEnum.BRONZE
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