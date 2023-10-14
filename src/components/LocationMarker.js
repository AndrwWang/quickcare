import locationmarkerIcon from "../styles/locationmarker.svg"

export default function LocationMarker({ lat, lng, onClick }) {
  const markerStyle = {
    position: 'absolute',
    left: `${lat-50}px`,  // Adjust the value according to your marker's design
    top: `${lng+40}px`,   // Adjust the value according to your marker's design
  };
  return (
    <div className="marker-container" style={markerStyle}>
    <img
      className='marker'
      src={locationmarkerIcon}
      alt="location marker"
      onClick={(e) => onClick(e, { latitude: lat, longitude: lng })}
    />
  </div>
  );
}