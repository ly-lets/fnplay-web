import React, { useState, useEffect } from "react";
import "./StepProgress.style.less";

const StepProgress = ({ range = [], initValue = null, onStepClick }) => {
  const [activeStep, setActiveStep] = useState(initValue); // Initialize with initValue

  useEffect(() => {
    setActiveStep(initValue); // Update activeStep if initValue changes
  }, [initValue]);

  const handleCircleClick = (value) => {
    setActiveStep(value);
    onStepClick(value); // Emit the clicked value
  };

  return (
    <div className="step-progress">
      {range.map((value, index) => (
        <React.Fragment key={value}>
          <div
            className={`circle ${activeStep >= value ? "active" : ""}`}
            onClick={() => handleCircleClick(value)}
          >
            {value}
          </div>
          {index < range.length - 1 && (
            <div
              className={`line ${activeStep >= range[index + 1] ? "active" : ""}`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepProgress;
