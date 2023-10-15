import { useState } from 'react';
import { Rating, Button, List, ListItem, Typography, IconButton, Grid, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/HospitalSidebarStyles.css';

function HospitalCard({ hospital, onClick }) {
    const addrLines = hospital.address.split('\n');
    console.log(hospital);
    return <Button
                style={{
                    border: "3px solid #E58B77",
                    color: "black",
                    textTransform: "none"
                }}
                onClick={(e) => onClick(e, addrLines[0])}
            >
            <Grid container>
                <Grid container direction="row" className="hospital-card-row">
                    <Grid item xs={8} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography variant='h7'>
                            {hospital.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography>
                            {hospital.time} min
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" className="hospital-card-row">
                    <Grid item xs={8}>
                        {addrLines.map((line, i) => {
                            return <Typography>
                            {line}
                        </Typography>
                        })}
                        
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            PLACEHOLDER DRIVE TIME
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" className="hospital-card-row">
                    <Grid item xs={8} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Grid container direction="row">
                            <Grid item xs={7} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                                <Rating
                                    size="small"
                                    precision={0.1}
                                    value={hospital.rating}
                                    readOnly
                                />
                            </Grid>
                            <Grid item xs={5} sx={{paddingLeft: '5px', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                <Typography>
                                    ({hospital.ratingCount})
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        {hospital.time}
                    </Grid>
                </Grid>
            </Grid>
        </Button>    
}

export default function HospitalSidebar({ hospitals, isExpanded, setExpanded, onHospitalClick }) {
    const fixedSizeStyle = isExpanded ? { height: '70vh', width: '25vw' } : {};
    const renderCollapsedContent = () => {
        return <IconButton onClick={() => {
            setExpanded(true);
        }}>
                    <MenuIcon sx={{fontSize: '3vw', padding: '5px'}}/>
                </IconButton>
    };
    const renderExpandedContent = (hospitals, onHospitalClick) => {
        return <div className="expanded-main-grid" style={fixedSizeStyle}>
            <List style={{overflow: 'auto', flex: 10}}>
                {hospitals.map((hospital, i) => {
                    return <ListItem>
                        <HospitalCard hospital={hospital} onClick={onHospitalClick}/>
                    </ListItem>
                })}
            </List>
            <IconButton sx={{flex: 1}}className="TEMP_TOGGLE" onClick={() => {
                setExpanded(false);
            }}>
                <MenuIcon sx={{fontSize: '3vw', padding: '5px'}}/>
            </IconButton> 
        </div>
    };

	return (
        <div className="floating-container" style={fixedSizeStyle}>
            {isExpanded ? renderExpandedContent(hospitals, onHospitalClick) : renderCollapsedContent() }
        </div>
	)
}