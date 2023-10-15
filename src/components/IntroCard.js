import React from "react";
import { Grid, Button } from "@mui/material";
import "../styles/NavBarStyles.css";

function IntroCard({ onClose }) {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={11} sm={10} md={6}> 
        <div style={styles.card}>
            <p style={styles.text}>IF YOU HAVE A LIFE THREATENING EMERGENCY PLEASE DIAL 911 </p>
          <Button variant="contained" style={styles.button} onClick={onClose}>
            I understand
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

const styles = {
  card: {
    backgroundColor: "#FFFFFF",
    padding: "20px",
    boxShadow: "5px 4px 11px 0px rgba(0, 0, 0, 0.50)",
    textAlign: "center",
    fontFamily: 'Kannada Sangam MN',
    border: "7px solid #EB7752", // Add a border
    borderRadius: "20px", // Rounded corners
  },
  heading: {
    fontSize: "1.5rem",
    color: "#545454"
  },
  text: {
    fontSize: "1.0rem",
    margin: "10px 0",
    color: "#545454",
    fontWeight: "bold", // Add this line to make the text bold
  },
  button: {
    backgroundColor: "#EB7752",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    fontFamily: "Kannada Sangam MN", // Apply the "Montserrat" font family
    borderRadius: "20px", // Rounded corners
    textTransform: "none", // Prevent all caps on the button text
  },
};

export default IntroCard;

