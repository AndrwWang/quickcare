import GoogleMap from 'google-maps-react-markers';
import React, { useRef, useState } from 'react'
import mapOptions from '../styles/map-options.json'
import '../styles/style.css'
import HospitalMarker from './HospitalMarker'

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

	const mapRef = useRef(null)
	const [mapReady, setMapReady] = useState(false)
	const [mapBounds, setMapBounds] = useState({})
	const [highlighted, setHighlighted] = useState(null)

	/**
	 * @description This function is called when the map is ready
	 * @param {Object} map - reference to the map instance
	 * @param {Object} maps - reference to the maps library
	 */
	const onGoogleApiLoaded = ({ map /* , maps */ }) => {
		mapRef.current = map
		setMapReady(true)
	}

	// eslint-disable-next-line no-unused-vars
	const onMarkerClick = (e, { markerId /* , lat, lng */ }) => {
		setHighlighted(markerId)
	}

	const onMapChange = ({ bounds, zoom }) => {
		const ne = bounds.getNorthEast()
		const sw = bounds.getSouthWest()

		setMapBounds({ ...mapBounds, bounds: [sw.lng(), sw.lat(), ne.lng(), ne.lat()], zoom })
		setHighlighted(null)
	}

	return (
		<main>
			<div className="map-container">
				<GoogleMap
					apiKey={API_KEY}
					defaultCenter={ATLANTA}
					defaultZoom={5}
					options={mapOptions}
					mapMinHeight="100vh"
					onGoogleApiLoaded={onGoogleApiLoaded}
					onChange={onMapChange}
				>
					<HospitalMarker
						lat={33.961121}
						lng={-83.387917}
					/>
				</GoogleMap>
			</div>
		</main>
	)
}