import { TextField, MenuList, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import '../styles/SearchBarStyles.css';

export default function SearchBar({ valueRef, onChange, autocompleteOptions, onLocationSelect }) {
	console.log(autocompleteOptions);
	return (
		<div className="search-bar">
			<TextField
				fullWidth
				placeholder="Search Location"
				inputRef={valueRef}
				onChange={onChange}
				style={{
					backgroundColor: "white",
					borderRadius: "10px"
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
					style: {
						borderRadius: "10px"
					}
				}}/>
			{ autocompleteOptions.length == 0 ? null : 
			<MenuList className="autocomplete-menu">
				{autocompleteOptions.map((option, i) => {
					return <MenuItem id={option.placeID} onClick={onLocationSelect}>
						{option.text}
					</MenuItem>
				})}
			</MenuList>
			}
		</div>
	);
}
