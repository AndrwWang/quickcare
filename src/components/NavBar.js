import '../styles/NavBarStyles.css'
import questchirpicon from '../styles/4.png'
import logo from '../styles/logo.svg'
import { Box, Grid, Typography } from '@mui/material'

export default function NavBar() {
  const navBarStyle = {
    boxShadow: "5px 4px 11px 0px rgba(0, 0, 0, 0.50)",
  };
    return (
      <Grid container className="navbar" style={navBarStyle}>
        <Grid item xs={2.1} sm={0.7} md={1.2} lg = {1.1} style={{ paddingTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem"}}>
        <img
            src={logo} // Replace this with the actual path to your logo image
            alt="logo"
            style={{ width: "60px", height: "auto" }}
          />
        </Grid>
        <Grid item xs={5.5} sm={3} md={1} lg = {0.5} className="title">
            QuickCare
        </Grid>
        <Grid item xs={0} sm={2} md={2} lg = {7}/>
        <Grid item xs={4} sm={6} md={6} lg = {3} className="trailer">
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                Finding the quickest treatment with real time data
            </Box>
        </Grid>
      </Grid>
    );
  }