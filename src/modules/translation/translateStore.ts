import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ILanguage = "USA" | "VNM"

interface IStore {
  currentLanguage: ILanguage
}

const translateStore = createSlice({
    name: 'translateStore',
    initialState: {
      currentLanguage: "USA",
    } as IStore,
    reducers: {
        updateLanguage: (state, action: PayloadAction<ILanguage>) => {
          return {
            ...state,
            currentLanguage: action.payload
          }
        }
    }
})

export default translateStore