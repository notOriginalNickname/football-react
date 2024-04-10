import React from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import Competitions from './pages/competitions/Competitions';
import Team from './pages/team/Team';
import Test from './pages/testPage/Test';
import Error from './pages/error/Error';
import Player from './pages/player/Player'
import CompetitionCalendar from './pages/competition-calendar/CompetitionCalendar';
import TeamMatches from './pages/team-matches/TeamMatches'
import Teams from './pages/teams-list/Teams';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route exact="true" path="/react-app" element={<Competitions />}/>
        <Route path="/competition/:code/matches" element={<CompetitionCalendar />} />
        <Route exact="true" path="/teams/:id/matches" element={<TeamMatches />} />
        <Route exact="true" path="/teams" element={<Teams />} />
        <Route exact="true" path="/teams/:id" element={<Team />}/>
        <Route exact="true" path="/persons/:id" element={<Player />}/>
        <Route exact="true" path="/test" element={<Test />}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    </App>
  </BrowserRouter>
);
