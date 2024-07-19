import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPass } from "../../types/pass";
import { fetchPasses } from "../../api/thunk";

interface IPassesState {
    passes: IPass[];
    status: "idle" | "loading" | "succeeded" | "failed",
    error: string | null;
}
const initialPassesState: IPassesState = {
    passes: [],
    status: "idle",
    error: null
}
export const passesSlice = createSlice({
    name: "passes",
    initialState: initialPassesState,
    reducers: {
        setPasses(state, action: PayloadAction<IPass[]>) {
            state.passes = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPasses.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPasses.fulfilled, (state, action: PayloadAction<IPass[]>) => {
                state.passes = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchPasses.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || 'Failed to fetch passes';
            });
    }
})
interface ISortedPassesState {
    sortedPasses: IPass[];
}
const initialsortedPassesState: ISortedPassesState = {
    sortedPasses: []
}
export const sortedPassesSlice = createSlice({
    name: "sortedPasses",
    initialState: initialsortedPassesState,
    reducers: {
        setSortedPasses(state, action: PayloadAction<IPass[]>) {
            state.sortedPasses = action.payload;
        }
    }
})

interface IPassState {
    pass: IPass | null;
}
const initialPassState: IPassState = {
    pass: null
}
export const passSlice = createSlice({
    name: "pass",
    initialState: initialPassState,
    reducers: {
        setPass(state, action: PayloadAction<IPass>) {
            state.pass = action.payload;
        }
    }
})

interface SelectedPassIdState { value: string | null; }
const initialSelectedPassIdState: SelectedPassIdState = { value: null };

export const selectedPassIdSlice = createSlice({
    name: "selectedPassId",
    initialState: initialSelectedPassIdState,
    reducers: {
        setSelectedPassId(state, action: PayloadAction<string>) {
            state.value = action.payload;
        },
        clearSelectedPassId(state) {
            state.value = null;
        }
    }
})

export const { setPass } = passSlice.actions;
export const { setPasses } = passesSlice.actions;
export const { setSortedPasses } = sortedPassesSlice.actions;
export const { setSelectedPassId, clearSelectedPassId } = selectedPassIdSlice.actions;

export default passesSlice.reducer;