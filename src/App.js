import ERRoom from './components/EmergencyRoom';
import Map from './components/Map'
import NavBar from './components/NavBar';

const App = () => {
	return <div style={{height: '100vh'}}>
		<NavBar />
		<ERRoom></ERRoom>
		<Map />
	</div>;
}

export default App