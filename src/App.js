import ERRoom from './components/EmergencyRoom';
import Map from './components/Map'
import NavBar from './components/NavBar';
import IntroCard from './components/IntroCard';
import React, { useState, useEffect } from 'react';

const App = () => {

	const [showIntroCard, setShowIntroCard] = useState(false);

  useEffect(() => {
    // Set introCardVisible to true when the component mounts
    setShowIntroCard(true);
  }, []);
  const handleCloseIntroCard = () => {
    setShowIntroCard(false);
  };

	return <div style={{height: '100vh'}}>
		{/* Intro card */}
		{showIntroCar && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <IntroCard onClose={handleCloseIntroCard} />
        </div>
      )}
	   <div style={{boxShadow: "5px 4px 11px 0px rgba(0, 0, 0, 0.50)"}}>
	   <NavBar />
	   </div>
		
		<ERRoom></ERRoom>
		<Map />
	</div>;
}

export default App