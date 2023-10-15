import { Divider, Box, Typography, TextField, MenuList, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../styles/SearchBarStyles.css';

export default function SearchBar({ valueRef, onChange, autocompleteOptions, onLocationSelect, placeText, onLocationSelected }) {
	return (
		<div className="search-bar">
			<TextField
				fullWidth
				placeholder={(valueRef === "") ? "Where are you?": placeText}
				inputRef={valueRef}
				onChange={onChange}
				style={{
					backgroundColor: "white",
					borderRadius: "10px",
					boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
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
			{ autocompleteOptions.length === 0 || onLocationSelected === true ? null : 
			<MenuList className="autocomplete-menu" sx={{boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'}}>
				{autocompleteOptions.map((option, i) => {
					return <MenuItem className="autocomplete-item" id={option.placeID} onClick={onLocationSelect}>
							<Typography variant="h6" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
								{option.primaryText}
							</Typography>
							<Box sx={{display: 'flex', maxWidth: '100%'}}>
								<LocationOnIcon />
								<Typography variant="h10" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
									{option.secondaryText}
								</Typography>
							</Box>
							
					</MenuItem>
				})}
			</MenuList>
			}
		</div>
	);
}
