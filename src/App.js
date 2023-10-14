import Map from './components/Map'
import NavBar from './components/NavBar';

const App = () => {
	return <div style={{height: '100vh'}}>
		<NavBar />
		<Map minHeight="85vh"/>
	</div>;
}

export default App