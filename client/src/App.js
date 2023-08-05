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
import { CssBaseline } from '@mui/material';



function App() {
  const mode = useSelector((state) => state.mode);


  return (
    <div className="app">
      <BrowserRouter>
        
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
      </BrowserRouter>
    </div>
  );
}

export default App;
