import '../styles/NavBarStyles.css'
import questchirpicon from '../styles/4.png'
import { Box, Grid, Typography } from '@mui/material'

export default function NavBar() {
    return (
      <Grid container className="navbar">
        <Grid item xs={0} sm={0.1} md={0.3} lg = {0.3}/>
        <Grid item xs={1.5} sm={0.7} md={1.2} lg = {1}>
        <img
            src={questchirpicon} // Replace this with the actual path to your logo image
            alt="QuestChirp Icon"
            style={{ width: "80px", height: "auto" }}
          />
        </Grid>
        <Grid item xs={5} sm={3} md={1} lg = {0.5} className="title">
            QuickCare
        </Grid>
        <Grid item xs={0} sm={2} md={2} lg = {6}/>
        <Grid item xs={4.5} sm={6} md={6} lg = {4} className="trailer">
            <Box>
                Finding the quickest treatment with real time data
            </Box>
        </Grid>
      </Grid>
    );
  }