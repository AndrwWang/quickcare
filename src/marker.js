import { func, number, oneOfType, string } from 'prop-types'
import React from 'react'

const Marker = ({ className, lat, lng, markerId, onClick, ...props }) =>
	lat && lng ? (
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
		<img
			className={className}
			src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw3AFtJoGDi9gMdmYSS3T-fw&ust=1697339676935000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNDmu5XJ9IEDFQAAAAAdAAAAABAE"}
			// eslint-disable-next-line react/no-unknown-property
			lat={lat}
			// eslint-disable-next-line react/no-unknown-property
			lng={lng}
			onClick={(e) => (onClick ? onClick(e, { markerId, lat, lng }) : null)}
			style={{ cursor: 'pointer', fontSize: 40 }}
			alt={markerId}
			{...props}
		/>
	) : null

Marker.propTypes = {
	className: string,
	/**
	 * The id of the marker.
	 */
	markerId: oneOfType([number, string]).isRequired,
	/**
	 * The latitude of the marker.
	 */
	lat: number.isRequired,
	/**
	 * The longitude of the marker.
	 */
	lng: number.isRequired,
	/**
	 * The function to call when the marker is clicked.
	 */
	onClick: func,
}

export default Marker