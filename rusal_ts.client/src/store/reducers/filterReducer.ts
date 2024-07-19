import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilter } from "../../types/filter";
import { EPassStatus } from "../../types/pass";

const initialState: IFilter | null = {
    passIdOrNumber: "",
    datefrom: "",
    dateto: "",
    status: EPassStatus.UNDEFINED,
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter(state: IFilter, action: PayloadAction<{ key: string, value: string } >) {
            const field = action.payload.key as keyof IFilter;
            if (field === "status")
                state[field] = action.payload.value as EPassStatus;
            else
                state[field] = action.payload.value;
        },
        clearFilter(state: IFilter) {
            state.passIdOrNumber = "";
            state.datefrom = "";
            state.dateto = "";
            state.status = EPassStatus.UNDEFINED;
        }
    }
});

export const { setFilter,clearFilter } = filterSlice.actions;