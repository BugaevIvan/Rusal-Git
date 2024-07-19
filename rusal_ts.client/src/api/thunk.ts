import { createAsyncThunk } from '@reduxjs/toolkit';
import MyService from './MyService';
import { IPass } from '../types/pass';
import { setSortedPasses } from '../store/reducers/passReducer';

export const fetchPasses = createAsyncThunk('passes/fetchPasses', async (_, { dispatch }) => {
    const response: IPass[] = await MyService.GetPasses();

    dispatch(setSortedPasses(response as IPass[]));

    return response;
});