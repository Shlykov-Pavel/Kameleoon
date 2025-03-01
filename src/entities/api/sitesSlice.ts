
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const initialState: SitesState = {
  sites: [],
  status: 'idle',
  error: null,
};

export const fetchSites = createAsyncThunk<Site[]>('sites/fetchSites', async () => {
  const response = await fetch('http://localhost:3100/sites'); 
  if (!response.ok) {
    throw new Error('Failed to fetch sites');
  }
  const data = await response.json();
  return data; 
});

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSites.fulfilled, (state, action: PayloadAction<Site[]>) => {
        state.status = 'succeeded';
        state.sites = action.payload; 
      })
      .addCase(fetchSites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong'; 
      });
  },
});

export default sitesSlice.reducer;