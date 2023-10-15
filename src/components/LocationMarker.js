//import locationmarkerIcon from "../styles/locationmarker.svg"
import locationmarkerIcon from "../styles/locationmarker2.svg"

export default function LocationMarker({ lat, lng, onClick }) {
  const markerStyle = {
    position: 'absolute',
    left: `${lat-50}px`,  // Adjust the value according to your marker's design
    top: `${lng+50}px`,   // Adjust the value according to your marker's design
  };

  // const markerSize = {
  //   width: "40px",  // Adjust the width as needed
  //   height: "40px", // Adjust the height as needed
  // };

  return (
    <div className="marker-container" style={markerStyle}>
    <img
      className='marker'
      src={locationmarkerIcon}
      alt="location marker"
      //style={markerSize}
      onClick={(e) => onClick(e, { latitude: lat, longitude: lng })}
    />
  </div>
  );
}