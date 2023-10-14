import '../styles/NavBarStyles.css'
import { Box, Grid, Typography } from '@mui/material'

export default function NavBar() {
    return (
      <Grid container className="navbar">
        <Grid item xs={1}>
            (logo placeholder)
        </Grid>
        <Grid item xs={1} className="title">
            <Typography>
                ER Find
            </Typography>
        </Grid>
        <Grid item xs={7} />
        <Grid item xs={3} className="trailer">
            <Box>
                <Typography>
                    Finding treatment quick using real time info
                </Typography>
            </Box>
        </Grid>
      </Grid>
    );
  }