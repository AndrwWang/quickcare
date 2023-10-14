import { useRef, useState } from 'react';
import GoogleMap from 'google-maps-react-markers'
import HospitalMarker from './HospitalMarker';

const App = () => {
  const mapRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */
  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map
    setMapReady(true)
  }

  const onMarkerClick = (e, { markerId, lat, lng }) => {
    console.log('This is ->', markerId)

    // inside the map instance you can call any google maps method
    mapRef.current.setCenter({ lat, lng })
    // rif. https://developers.google.com/maps/documentation/javascript/reference?hl=it
  }

  return (
    <>
      {mapReady && <div>Map is ready. See for logs in developer console.</div>}
      <GoogleMap
        apiKey=""
        defaultCenter={{ lat: 45.4046987, lng: 12.2472504 }}
        defaultZoom={5}
        //options={mapOptions}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map) => console.log('Map moved', map)}
      >
        {/* {coordinates.map(({ lat, lng, name }, index) => (
          <Marker
            key={index}
            lat={lat}
            lng={lng}
            markerId={name}
            onClick={onMarkerClick} // you need to manage this prop on your Marker component!
            // draggable={true}
            // onDragStart={(e, { latLng }) => {}}
            // onDrag={(e, { latLng }) => {}}
            // onDragEnd={(e, { latLng }) => {}}
          />
        ))} */}
        <HospitalMarker>
        lat={33.961121}
        lng={-83.387917}
        </HospitalMarker>
      </GoogleMap>
    </>
  )
}

export default App