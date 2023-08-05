import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    appliedAgent: null, // will be storing osu id once registered
    appliedTeam: null, // will be storing team name once registered
}

export const authSlice = createSlice({
    name: "userstate",
    initialState: initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setRegisterAgent: (state, action) => {
            state.appliedAgent = action.payload.osuId;
        },
        setRegisterTeam: (state, action) => {
            state.appliedTeam = action.payload.teamName;
        }
    }
})

export const { setMode, setRegisterAgent, setRegisterTeam } = authSlice.actions;

export default authSlice.reducer;