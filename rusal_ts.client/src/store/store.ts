import { configureStore  } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userReducer";
import { passesSlice, passSlice, selectedPassIdSlice, sortedPassesSlice } from "./reducers/passReducer";
import { filterSlice } from "./reducers/filterReducer";
import {thunk} from "redux-thunk"; 

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        passSelector: passSlice.reducer,
        passesSelector: passesSlice.reducer,
        sortedPassesSelector: sortedPassesSlice.reducer,
        selectedPassIdSelector: selectedPassIdSlice.reducer,
        filterSelector: filterSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()));

// Определим типы для использования в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;