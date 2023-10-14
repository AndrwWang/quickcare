import { TextField, MenuList, MenuItem } from "@mui/material";
import '../styles/SearchBarStyles.css';

export default function SearchBar({ valueRef, onChange, autocompleteOptions, onLocationSelect }) {
	console.log(autocompleteOptions);
	return (
		<div className="search-bar">
			<TextField fullWidth label="Search Location" inputRef={valueRef} onChange={onChange} />
			<MenuList className="autocomplete-menu">
				{autocompleteOptions.map((option, i) => {
					return <MenuItem id={option.placeID} onClick={onLocationSelect}>
						{option.text}
					</MenuItem>
				})}
			</MenuList>
		</div>
	);
}