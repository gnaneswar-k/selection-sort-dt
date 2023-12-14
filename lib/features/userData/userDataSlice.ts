import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
export interface UserDataState {
  userId: string
}

// Define the initial state using that type
const initialState: UserDataState = {
  userId: ""
}

export const userDataSlice = createSlice({
  name: 'userData',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    }
  }
})

export const { updateUserId } = userDataSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState) => state.userData.userId

export default userDataSlice.reducer
