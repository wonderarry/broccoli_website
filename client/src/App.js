import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import AgentsPage from 'scenes/agentsPage';
import TeamsPage from 'scenes/teamsPage';
import BracketPage from 'scenes/bracketPage';
import RegisterAgentPage from 'scenes/registerAgentPage';
import RegisterTeamPage from 'scenes/registerTeamPage';
import RulesPage from 'scenes/rulesPage';
import MappoolPage from 'scenes/mappoolPage';

import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from 'theme';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/register/agent" element={<RegisterAgentPage />} />
            <Route path="/register/team" element={<RegisterTeamPage />} />
            <Route path="/bracket" element={<BracketPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/mappool" element={<MappoolPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
