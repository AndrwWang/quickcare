import GoogleMap from 'google-maps-react-markers';
import React, { useRef, useState } from 'react'
import mapOptions from '../styles/map-options.json'
import '../styles/style.css'
import HospitalMarker from './HospitalMarker'
import { Typography } from '@mui/material';

export default function Map() {
  const MAPS_API_KEY = "AIzaSyCaE9RH_1va56W_XJ9HzdWC6h-ufMH7DZQ";
  const ROUTES_API_KEY = "AIzaSyAwD84G84lq3_xFmARY1p0ve9DrANs_cv8";
  const ATLANTA = {
    lat: 33.7488,
    lng: -84.3877
  }
  const PIEDMONT_ATHENS = {
    lat: 33.9519,
    lng: -83.3576 // just athens
  }

	const mapRef = useRef(null)
  const mapsRef = useRef(null)
  const directionsUtil = useRef(null)
  const userLocation = useRef(null)
	const [mapReady, setMapReady] = useState(false)
	const [mapBounds, setMapBounds] = useState({})
	const [highlighted, setHighlighted] = useState(null)
  const [travelTime, setTravelTime] = useState(0)

	/**
	 * @description This function is called when the map is ready
	 * @param {Object} map - reference to the map instance
	 * @param {Object} maps - reference to the maps library
	 */
	const onGoogleApiLoaded = ({ map, maps }) => {
		mapRef.current = map
    mapsRef.current = maps

    const serv = new mapsRef.current.DirectionsService();
    const rend = new mapsRef.current.DirectionsRenderer();
    rend.setMap(map);
    directionsUtil.current = {
      service: serv,
      renderer: rend
    }
    
    getSetUserLoc()
		setMapReady(true)
	}

  function getSetUserLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // infoWindow.setPosition(pos);
          // infoWindow.setContent("Location found.");
          // infoWindow.open(map);
          // map.setCenter(pos);
          console.log('response received from geolocation!')
          userLocation.current = {
            latitude: pos.lat,
            longitude: pos.lng
          };
        },
        () => {
          console.log("geolocation error");
        },
      );
    } else {
      console.log("browser doesn't support geolocation");
    }
  }

  function queryRoutesAPI(destination) {
    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': ROUTES_API_KEY,
      'X-Goog-FieldMask': 'routes.duration',
    };

    const requestBody = {
      origin: {
        location: {
          latLng: userLocation.current,
        },
      },
      destination: {
        location: {
          latLng: destination,
        },
      },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_AWARE',
      departureTime: (new Date(Date.now() + 1000)).toISOString(),
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      languageCode: 'en-US',
      units: 'IMPERIAL',
    };

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response:', data);
          const strDuration = data.routes[0].duration;
          resolve(parseInt(strDuration.substring(0, strDuration.length - 1)));
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
    });
  }

  function calculateAndDisplayRoute(destination) {
    const directionsService = directionsUtil.current.service;
    const directionsRenderer = directionsUtil.current.renderer;
    console.log(mapsRef.current.TrafficModel.PESSIMISTIC);
    directionsService
      .route({
        origin: {
          lat: userLocation.current.latitude,
          lng: userLocation.current.longitude
        },
        destination: {
          lat: destination.latitude,
          lng: destination.longitude
        },
        travelMode: mapsRef.current.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: mapsRef.current.TrafficModel.PESSIMISTIC
        }
      })
      .then((response) => {
        // // travel time is returned in seconds
        // console.log(response.routes);
        // setTravelTime(response.routes[0].legs[0].duration.value);
        // console.log('response received from directionService!')
        directionsRenderer.setDirections(response);
        queryRoutesAPI(destination).then((duration) => {
          console.log('Success! Duration found')
          setTravelTime(duration);
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error:", error);
        });
      })
      .catch((e) => window.alert("Directions request failed: " + e));
  }
  
	// eslint-disable-next-line no-unused-vars
	const onMarkerClick = (e, location) => {
    console.log('clicked!');
    console.log(location);
    console.log(userLocation.current);
		calculateAndDisplayRoute(location);
	}

	const onMapChange = ({ bounds, zoom }) => {
		const ne = bounds.getNorthEast()
		const sw = bounds.getSouthWest()

		setMapBounds({ ...mapBounds, bounds: [sw.lng(), sw.lat(), ne.lng(), ne.lat()], zoom })
		setHighlighted(null)
	}

	return (
			<div className="map-container">
        <Typography>
          Travel Time: {travelTime / 3600} hours
        </Typography>
				<GoogleMap
					apiKey={MAPS_API_KEY}
					defaultCenter={ATLANTA}
					defaultZoom={5}
					options={mapOptions}
					mapMinHeight="100vh"
					onGoogleApiLoaded={onGoogleApiLoaded}
					onChange={onMapChange}
				>
					<HospitalMarker
						lat={PIEDMONT_ATHENS.lat}
						lng={PIEDMONT_ATHENS.lng}
            onClick={onMarkerClick}
					/>
				</GoogleMap>
			</div>
	)
}