import hospitalIcon from "../styles/hospital.svg"

export default function HospitalMarker({ lat, lng, onClick }) {
  const markerStyle = {
    position: 'absolute',
    left: `${lat-50}px`,  // Adjust the value according to your marker's design
    top: `${lng+50}px`,   // Adjust the value according to your marker's design
  };
  const markerSize = {
    width: "40px",  // Adjust the width as needed
    height: "40px", // Adjust the height as needed
  };

  return (
    <div className="marker-container" style={markerStyle}>
      <img
        className='marker'
        src={hospitalIcon}
        alt="hospital marker"
        style={markerSize}
        onClick={(e) => onClick(e, { latitude: lat, longitude: lng })}
      />
    </div>
  );
}
