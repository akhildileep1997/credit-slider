import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom'

const CreditSlider = () => {
  // State for setting the toggle switch
  const [toggleSwitchValue, setToggleSwitchValue] = useState(true);

  // State for holding the slider value
  const [sliderValue, setSliderValue] = useState(10);

  //here setting the initial slider value to default $10 for 1200 credit points
  useEffect(() => {
    const initialValue = 10;
    setSliderValue(initialValue);
  }, []);

  //for switching between on and of on toggle switch
  const toggleSwitchChangeHandler = () => {
    setToggleSwitchValue(!toggleSwitchValue);
  };

  //setting the newest value to slider value
  const handleSliderChange = (e, newValue) => {
    setSliderValue(newValue);
  };

  const handleAutoPurchaseConfirm = () => {
    console.log("Selected credit amount:", getCredits(sliderValue), "credits");
  };

  //here assigning the credit points values to the marks($ price value based on condition)
  const getCredits = (value) => {
    if (value <= 5) return 500;
    if (value <= 10) return 1200;
    if (value <= 15) return 1700;
    if (value <= 20) return 2500;
    if (value <= 25) return 3900;
    // For values greater than 25
    return 5000;
  };

  //creating a separate component in order to display the details of credit points per price
  const DisplaySliderCreditPoints = ({ value }) => {
    return (
      <div className="slider-credit">
        <p style={{fontWeight:'600',color:'black',fontSize:'19px'}}>{`$ ${value}`}</p>
        <p className="credit">{getCredits(value)} <br /> credits</p>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="switch">
        <div>
          <h3>Set up Auto Top-up</h3>
        </div>
        <div>
          <Switch
            className="switch-icon"
            checked={toggleSwitchValue}
            onChange={toggleSwitchChangeHandler}
            sx={{
              "& .MuiSwitch-track": {
                backgroundColor: "rgb(6, 130, 93)",
              },
              "& .MuiSwitch-thumb": {
                color: "white",
              },
            }}
          />
        </div>
      </div>
      <div>
        <p>
          Once the credit goes below a minimum threshold <span>$50</span>, we
          will auto purchase <span>$1200</span> credit points and add them to
          your <br /> account. <Link style={{color:'gray',fontWeight:'700'}}>Learn more</Link>
        </p>
      </div>
      {toggleSwitchValue && (
        <div className="box-container">
          <Box className="box">
            <Slider
              sx={{
                "& .MuiSlider-rail": {
                  color: "gray",
                  height: 8,
                  borderRadius: 2,
                },
                "& .MuiSlider-thumb": {
                  color: "white",
                  border: "5px solid rgb(152,71,255)",
                },
                color: "rgb(152,71,255)",
              }}
              className="slide-icon"
              value={sliderValue}
              onChange={handleSliderChange}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              min={5} //min value $5
              max={30} //max value $30
              marks={[
                { value: 5, label: <DisplaySliderCreditPoints value={5} /> },
                { value: 10, label: <DisplaySliderCreditPoints value={10} /> },
                { value: 15, label: <DisplaySliderCreditPoints value={15} /> },
                { value: 20, label: <DisplaySliderCreditPoints value={20} /> },
                { value: 25, label: <DisplaySliderCreditPoints value={25} /> },
                { value: 30, label: <DisplaySliderCreditPoints value={30} /> },
              ]} // showing credit points based on the price
              valueLabelFormat={(value) => `$${value}`}
            />
          </Box>
          <Button
            sx={{
              marginTop: "70px",
              backgroundColor: "rgb(127, 50, 228)",
              color: "white",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
            className="btn"
            onClick={handleAutoPurchaseConfirm}
            variant="contained"
          >
            Confirm auto-purchase
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreditSlider;
