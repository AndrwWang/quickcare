import '../styles/MarkerStyles.css';

export default function HospitalMarker({ lat, lng, onClick }) {
  return (
    <img className='marker' src='https://www.buckheadhairrestoration.com/wp-content/uploads/2014/10/20x20-Checkmark-300x300.png'
     onClick={(e) => ( onClick(e, {latitude: lat, longitude: lng}) )}
     />
  );
}