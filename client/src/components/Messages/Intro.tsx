import React, { useState } from "react";
import styles from "@components/Messages/intro.module.css";

const Intro: React.FC = () => {
  const [isReplied, setIsReplied] = useState(false);

  const toggleHandler = () => {
    setIsReplied(!isReplied);
  };

  return (
    <div className={styles.container}>
      {
        //This is the heading and back button
      }
      <div className={styles.leftPart}>
        <button className={styles.backButton}>← Back</button>
        {
          //Attach a link to the "back" button for functionality
        }
        <h1 className={styles.heading}>MESSAGES</h1>
      </div>

      {
        //This switch toggles between replied and not replied messages
        //Intrigate the toggle handler with the backend
      }
      <div className={styles.rightPart}>
        <button
          className={`${styles.toggleButton} ${
            isReplied ? styles.replied : styles.notReplied
          }`}
          onClick={toggleHandler}
        >
          {isReplied ? "Replied" : "Not Replied"}
        </button>
      </div>
    </div>
  );
};

export default Intro;
