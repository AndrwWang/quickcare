import { Divider, Box, Typography, TextField, MenuList, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../styles/SearchBarStyles.css';

export default function SearchBar({ valueRef, onChange, autocompleteOptions, onLocationSelect }) {
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
