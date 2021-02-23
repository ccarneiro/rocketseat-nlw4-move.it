import React from 'react';
import { ExperienceBar } from './components/ExperienceBar';

import './styles/global.css';

function App() {
  return (
    <div className="container">
      <ExperienceBar start={0} end={600} current={500} />
    </div>
  );
}

export default App;
