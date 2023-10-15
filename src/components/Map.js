import GoogleMap from "google-maps-react-markers";
import React, { useRef, useState, useEffect } from "react";
import mapOptions from "../styles/map-options.json";
import "../styles/style.css";
import HospitalMarker from "./HospitalMarker";
import LocationMarker from "./LocationMarker";
import { Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import ERRoom, { ChildrenHospitalInfo } from "./EmergencyRoom";
import HospitalSidebar from "./HospitalSidebar";

export default function Map() {
  const MAPS_API_KEY = "AIzaSyCaE9RH_1va56W_XJ9HzdWC6h-ufMH7DZQ";
  const ROUTES_API_KEY = "AIzaSyAwD84G84lq3_xFmARY1p0ve9DrANs_cv8";
	
  const ATLANTA = {
    lat: 33.7488,
    lng: -84.3877,
  };
  const PIEDMONT_ATHENS = {
    lat: 33.9519,
    lng: -83.3576, // just athens
  };

  // the style of the route line
  const polylineOptions = {
    strokeColor: "#000000",
    strokeOpacity: 0.5,
    strokeWeight: 10,
  };

  const [places, setPlaces] = useState([]);
  const [place_id, setPlaceId] = useState(null);
  const mapRef = useRef(null);
  const mapsRef = useRef(null);
  const directionsUtil = useRef(null);
  const autocompleteService = useRef(null);
  const geocoder = useRef(null);

  // default starting location is the user location
  const startLocation = useRef(null);

  const searchValue = useRef("");
  const placeTextValue = useRef("");
  const selected = useRef(false);
  const [mapBounds, setMapBounds] = useState({});
  // const [markers, setMarkers] = useState([]);
  const [destMarker, setDestMarker] = useState(PIEDMONT_ATHENS);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedHospitalIndex, setSelectedHospitalIndex] = useState(0);
  const [sortingInProgress, setSortingInProgress] = useState(true);

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */
  const onGoogleApiLoaded = async ({ map, maps }) => {
    //ChildrenHospitalInfo().then((response) => setPlacesArray(DataGatherer().concat(response)));
    var placesArray = [];
    var places = [];
    await ERRoom().then((result) => {
      placesArray = result;
      const PlacesService = new maps.places.PlacesService(
        document.createElement("div")
      );
      for (let i = 0; i < placesArray.length; i++) {
        const request = {
            fields: ['place_id', 'rating', 'user_ratings_total' ],
            query: placesArray[i].name
            };
        PlacesService.findPlaceFromQuery(request, (result, status) => {
            placesArray[i].rating = result[0].rating;
			placesArray[i].ratingCount = result[0].user_ratings_total;
			placesArray[i].place_id = result[0].place_id;
			places.push(placesArray[i]);
        });
      }
      setPlaces(places);
    });
    mapRef.current = map;
    mapsRef.current = maps;

    autocompleteService.current =
      new mapsRef.current.places.AutocompleteService();
    geocoder.current = new mapsRef.current.Geocoder();

    const serv = new mapsRef.current.DirectionsService();
    const rend = new mapsRef.current.DirectionsRenderer({
      polylineOptions: new mapsRef.current.Polyline(polylineOptions),
      suppressMarkers: true,
    });

    rend.setMap(map);
    directionsUtil.current = {
      service: serv,
      renderer: rend
    }
    
    getSetUserLoc()
	var smallestValue = 100000000;
	var timedArray = [];
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
		  async (geoPosition) => {
			// Extract latitude and longitude from the position object
			const { latitude, longitude } = geoPosition.coords;
			var start = {
			  latitude: latitude,
			  longitude: longitude,
			};
			var closestDestination = null;
			console.log(start, "start");
	  
			for (let i = 0; i < places.length; i++) {
			  try {
				const { results } = await geocoder.current.geocode({ placeId: places[i].place_id });
	  
				const destination = {
				  latitude: results[0].geometry.location.lat(),
				  longitude: results[0].geometry.location.lng(),
				};
				console.log("destination", destination);
				var time = 0;
				const result = await queryRoutesAPI(start, destination);
				console.log("wait time", places[i].time);
				console.log("drive time", result);
	  
				places[i].overall_time = places[i].time + result / 60;
				console.log(places[i]);
				console.log("overall", places[i].overall_time);
			  } catch (error) {
				window.alert(error);
			  }
			}
	  
			// Sort the array after the for loop is done
			places.sort((a, b) => (a.overall_time < b.overall_time ? -1 : a.overall_time > b.overall_time ? 1 : 0));;
      setSortingInProgress(false);
      setSidebarOpen(true);
      setPlaces(places);

			const { results } = await geocoder.current.geocode({ placeId: places[0].place_id });
	  
				const destination = {
				  latitude: results[0].geometry.location.lat(),
				  longitude: results[0].geometry.location.lng(),
				};
			calculateAndDisplayRoute(start, destination);
	  },
	  (error) => {
		console.error('Error getting current position:', error);
	  }
	);
  } else {
		console.error('Geolocation is not supported by this browser.');
	  }
	
	}
  async function getSetUserLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("response received from geolocation!");
          startLocation.current = {
            latitude: pos.lat,
            longitude: pos.lng,
          };
        },
        () => {
          console.log("geolocation error");
        }
      );
    } else {
      console.log("browser doesn't support geolocation");
    }
  }

  async function queryRoutesAPI(start, destination) {

    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';

    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": ROUTES_API_KEY,
      "X-Goog-FieldMask": "routes.duration",
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
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
      departureTime: new Date(Date.now() + 1000).toISOString(),
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      languageCode: "en-US",
      units: "IMPERIAL",
    };

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response:", data);
          const strDuration = data.routes[0].duration;
          resolve(parseInt(strDuration.substring(0, strDuration.length - 1)));
        })
        .catch((error) => {
          console.error("Error:", error);
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
          lng: start.longitude,
        },
        destination: {
          lat: destination.latitude,
          lng: destination.longitude,
        },
        travelMode: mapsRef.current.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: mapsRef.current.TrafficModel.PESSIMISTIC,
        },
      })
      .then((response) => {
        directionsRenderer.setDirections(response);

        setDestMarker({
          lat: destination.latitude,
          lng: destination.longitude,
          isHospital: true,
        });
        queryRoutesAPI(start, destination)
          .then((duration) => {
            console.log("Success! Duration found");
          })
          .catch((error) => {
            // Handle any errors here
            console.error("Error:", error);
          });
      })
      .catch((e) => window.alert("Directions request failed: " + e));
  }

  function getLatLngFromPlaceID(placeID) {
    return new Promise((resolve, reject) => {
      geocoder.current
      .geocode({ placeId: placeID })
      .then(({ results }) => {
        const latLng = {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
        };
        resolve(latLng);
      })
      .catch((error) => {
        window.alert(error);
        reject(error);
      });
    })
  }

  function getAutocompletePredictions(targetSearch) {
    return new Promise((resolve, reject) => {
      autocompleteService.current
      .getPlacePredictions({
        input: targetSearch,
      })
      .then((response) => {
        const predictions = response.predictions;
        let newPredictions = [];
        for (var i = 0; i < predictions.length; i++) {
          newPredictions.push({
            primaryText: predictions[i].structured_formatting.main_text,
            secondaryText: predictions[i].structured_formatting.secondary_text,
            placeID: predictions[i].place_id,
          });
        }
        resolve(newPredictions);
      })
      .catch((error) => {
        console.error("Error fetching place predictions:", error);
        reject(error);
      });
    })
  }

  const onMarkerClick = (e, location) => {
    console.log("marker clicked!");
    calculateAndDisplayRoute(startLocation.current, location);
  };

  // location selected in autocomplete dropdown menu
  const onLocationSelect = async (e) => {
    // make sure to get the MenuItem component, which has the placeID
    const menuItem = e.target.closest(".autocomplete-item");
    const placeID = menuItem.id;
    setAutocompleteResults([])

    placeTextValue.current = menuItem.ariaLabel;
    getLatLngFromPlaceID(placeID).then((latLng) => {
      startLocation.current = latLng;
      calculateAndDisplayRoute(latLng, {
        latitude: PIEDMONT_ATHENS.lat,
        longitude: PIEDMONT_ATHENS.lng,
      });
    })
    .catch((error) => {
      console.log(error)
    });

  };

  const onMapChange = ({ bounds, zoom }) => {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    setMapBounds({
      ...mapBounds,
      bounds: [sw.lng(), sw.lat(), ne.lng(), ne.lat()],
      zoom,
    });
  };

  const searchUpdated = async (e) => {
    const newSearch = e.target.value;
    placeTextValue.current = newSearch;
    if (newSearch == "") {
      setAutocompleteResults([]);
      return;
    }

    getAutocompletePredictions(newSearch).then((predictions) => {
      setAutocompleteResults(predictions);
    })
    .catch((error) => {
      console.error("Error fetching place predictions:", error);
    });
  };

  // called when hospital is selected in sidebar list
  const onHospitalSelect = (e, index, address) => {
    setSelectedHospitalIndex(index);
    
    // use autocomplete to get place_id of best match
    // then get latLng from place_id
    // finally use latLng to display route info to user
    getAutocompletePredictions(address).then((predictions) => {
      const placeID = predictions[0].placeID;
      getLatLngFromPlaceID(placeID).then((latLng) => {
        calculateAndDisplayRoute(startLocation.current, latLng);
      });
    })
    .catch((error) => {
      console.error("Error fetching place predictions:", error);
    });
  }
  console.log(sortingInProgress);
  return (
    <div className="map-container">
      <HospitalSidebar
        hospitals={places}
        isExpanded={isSidebarOpen}
        setExpanded={setSidebarOpen}
        onHospitalClick={onHospitalSelect}
        selectedIndex={selectedHospitalIndex}
      />{
        sortingInProgress ? 
        <div style={{
          position: 'absolute',
          zIndex: 999,
          bottom: '10vh',
          left: '42vw',
          right: '42vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingTop: '10px',
          paddingBottom: '10px',
          borderRadius: '10px',
          border: '3px solid #E58B77'
        }}>
          Sorting hospital data...
        </div>
        :
        null
      }
      <SearchBar
        valueRef={searchValue}
        onLocationSelected={selected.current}
        onChange={searchUpdated}
        placeText={placeTextValue.current}
        autocompleteOptions={autocompleteResults}
        onLocationSelect={onLocationSelect}
      />
      <GoogleMap
        apiKey={MAPS_API_KEY}
        defaultCenter={ATLANTA}
        defaultZoom={12}
        libraries={["places"]}
        options={mapOptions}
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={onMapChange}
      >
        {startLocation.current != null ? <LocationMarker
                lat={startLocation.current.latitude}
                lng={startLocation.current.longitude}
                onClick={onMarkerClick}
              />: null}
        <HospitalMarker
                lat={destMarker.lat}
                lng={destMarker.lng}
                onClick={onMarkerClick}
              />
        
        {/* {markers.map((marker, i) => {
          if (marker.isHospital && i == markers.length - 1) {
            return (
              <HospitalMarker
                lat={marker.lat}
                lng={marker.lng}
                onClick={onMarkerClick}
                key={i}
              />
            );
          }
        })} */}
      </GoogleMap>
    </div>
  );
}
