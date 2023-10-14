import GoogleMap from 'google-maps-react-markers';
import HospitalMarker from './HospitalMarker';

export default function Map() {
  const API_KEY = "AIzaSyCaE9RH_1va56W_XJ9HzdWC6h-ufMH7DZQ";
  const ATLANTA = {
    lat: 33.7488,
    lng: -84.3877
  }
  const PIEDMONT_ATHENS = {
    lat: 33.961121,
    lng: -83.387917
  }

  // const HospitalPin = () => {
  //   return <div style={{border: "5px solid blue", position: "absolute", width: "50px"}}>
  //     test
  //   </div>
  // };
  const defaultProps = {
    center: ATLANTA,
    zoom: 8
  };

  // const renderMarkers = (map, maps) => {
  //   let marker = new maps.Marker({
  //   position: { lat: latitude, lng: longitude },
  //   map,
  //   title: 'Hello World!'
  //   });
  //   return marker;
  //  };
   
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '400px', width: '400px' }}>
      <GoogleMap
        apiKey={API_KEY}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
      >
        <HospitalMarker>
          lat={PIEDMONT_ATHENS.lat}
          lng={PIEDMONT_ATHENS.lng}
        </HospitalMarker>
      </GoogleMap>
    </div>
  );
}

// const AnyReactComponent = ({ text }) => (
//   <div style={{
//     color: 'white', 
//     background: 'grey',
//     padding: '15px 10px',
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '100%',
//     transform: 'translate(-50%, -50%)'
//   }}>
//     {text}
//   </div>
// );

// class SimpleMap extends React.Component {
//   static defaultProps = {
//     center: {lat: 59.95, lng: 30.33},
//     zoom: 11
//   };

//   render() {
//     return (
//        <GoogleMapReact
//         defaultCenter={this.props.center}
//         defaultZoom={this.props.zoom}
//       >
//         <AnyReactComponent 
//           lat={59.955413} 
//           lng={30.337844} 
//           text={'Kreyser Avrora'} 
//         />
//       </GoogleMapReact>
//     );
//   }
// }


// ReactDOM.render(
//   <div style={{width: '100%', height: '400px'}}>
//     <SimpleMap/>
//   </div>,
//   document.getElementById('main')
// );
