import GoogleMap from 'google-maps-react-markers';
import React, { useRef, useState } from 'react'
import mapOptions from '../styles/map-options.json'
import '../styles/style.css'
import HospitalMarker from './HospitalMarker'
import LocationMarker from './LocationMarker'
import { Typography } from '@mui/material';
import SearchBar from './SearchBar';

export default function Map({ minHeight }) {
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

  // the style of the route line
  const polylineOptions = {
    strokeColor: '#000000',
    strokeOpacity: 0.5,
    strokeWeight: 10
  };

	const mapRef = useRef(null)
  const mapsRef = useRef(null)
  const directionsUtil = useRef(null)
  const autocompleteService = useRef(null);
  const geocoder = useRef(null);

  const userLocation = useRef(null)
  const searchValue = useRef('')
	const [mapBounds, setMapBounds] = useState({})
  const [travelTime, setTravelTime] = useState(0)
  const [markers, setMarkers] = useState([]);
  const [autocompleteResults, setAutocompleteResults] = useState([]);

	/**
	 * @description This function is called when the map is ready
	 * @param {Object} map - reference to the map instance
	 * @param {Object} maps - reference to the maps library
	 */
	const onGoogleApiLoaded = async ({ map, maps }) => {
    setMarkers([
      {
        lat: PIEDMONT_ATHENS.lat,
        lng: PIEDMONT_ATHENS.lng,
        isHospital: true
      }
    ]);
		mapRef.current = map
    mapsRef.current = maps
    autocompleteService.current = new mapsRef.current.places.AutocompleteService();
    geocoder.current = new mapsRef.current.Geocoder();

    const serv = new mapsRef.current.DirectionsService();
    const rend = new mapsRef.current.DirectionsRenderer({
      polylineOptions: new mapsRef.current.Polyline(polylineOptions),
      suppressMarkers: true
    });
    
    rend.setMap(map);
    directionsUtil.current = {
      service: serv,
      renderer: rend
    }
    
    getSetUserLoc()
	}

  function getSetUserLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log('response received from geolocation!')
          userLocation.current = {
            latitude: pos.lat,
            longitude: pos.lng,
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

  function queryRoutesAPI(start, destination) {
    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': ROUTES_API_KEY,
      'X-Goog-FieldMask': 'routes.duration',
    };

    const requestBody = {
      origin: {
        location: {
          latLng: start,
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

  function calculateAndDisplayRoute(start, destination) {
    const directionsService = directionsUtil.current.service;
    const directionsRenderer = directionsUtil.current.renderer;
    directionsService
      .route({
        origin: {
          lat: start.latitude,
          lng: start.longitude
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
        directionsRenderer.setDirections(response);
        setMarkers([
          ...markers,
          {
            lat: userLocation.current.latitude,
            lng: userLocation.current.longitude, 
            isLocation: true
          },
          {
            lat: destination.latitude,
            lng: destination.longitude,
            isHospital: true
          }
        ])
        queryRoutesAPI(start, destination).then((duration) => {
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
  
	const onMarkerClick = (e, location) => {
    console.log('marker clicked!');
		calculateAndDisplayRoute(userLocation.current, location);
	}

  // location selected in autocomplete dropdown menu
  const onLocationSelect = (e) => {
    const placeID = e.target.id;
    geocoder.current.geocode({ placeId: placeID })
    .then(({ results }) => {
      const start = {
        latitude: results[0].geometry.location.lat(),
        longitude: results[0].geometry.location.lng()
      };
      calculateAndDisplayRoute(start, {
        latitude: PIEDMONT_ATHENS.lat,
        longitude: PIEDMONT_ATHENS.lng
      });
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
  }

	const onMapChange = ({ bounds, zoom }) => {
		const ne = bounds.getNorthEast()
		const sw = bounds.getSouthWest()

		setMapBounds({ ...mapBounds, bounds: [sw.lng(), sw.lat(), ne.lng(), ne.lat()], zoom })
	}

  const searchUpdated = async (e) => {
    const newSearch = e.target.value;
    console.log('new value: ' + newSearch);
    autocompleteService.current.getPlacePredictions({
      input: newSearch
    })
    .then((response) => {
      const predictions = response.predictions;
      let newPredictions = [];
      for (var i = 0; i < predictions.length; i++) {
        console.log(predictions[i]);
        newPredictions.push({
          text: predictions[i].description,
          placeID: predictions[i].place_id
        })
      }
      setAutocompleteResults(newPredictions);
    })
    .catch((error) => {
      console.error("Error fetching place predictions:", error);
    });
  }

	return (
			<div className="map-container">
        <Typography>
          Travel Time: {travelTime / 3600} hours
        </Typography>
        <SearchBar
          valueRef={searchValue}
          onChange={searchUpdated}
          autocompleteOptions={autocompleteResults}
          onLocationSelect={onLocationSelect}
        />
				<GoogleMap
					apiKey={MAPS_API_KEY}
					defaultCenter={ATLANTA}
					defaultZoom={12}
					options={mapOptions}
					onGoogleApiLoaded={onGoogleApiLoaded}
					onChange={onMapChange}
          mapMinHeight={minHeight}
				>
          {markers.map((marker, i) => {
            if (marker.isHospital) {
              return <HospitalMarker
                lat={marker.lat}
                lng={marker.lng}
                onClick={onMarkerClick}
              />
            }
            // } else if (marker.isLocation) {
            //   return <LocationMarker
            //   lat={marker.lat}
            //   lng={marker.lng}
            //   onClick={onMarkerClick}
            // />
          })}
				</GoogleMap>
			</div>
	)
}