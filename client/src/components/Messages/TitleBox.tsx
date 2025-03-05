'use client';
import { useState } from 'react';
import styles from '@/components/Messages/TitleBox.css';

export const TitleBox = () => {
  const [isReplied, setIsReplied] = useState(false);

  return (
    <div className={styles.container}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <button className={styles.backButton}>
          <span className={styles.arrow}>&larr;</span>
          <span>BACK</span>
        </button>
        <h1 className={styles.title}>MESSAGES</h1>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <div 
          className={styles.toggleContainer}
          onClick={() => setIsReplied(!isReplied)}
        >
          <div className={`${styles.slider} ${isReplied ? styles.active : ''}`} />
          <span className={styles.toggleLabel}>REPLIED</span>
          <span className={styles.toggleLabel}>NOT REPLIED</span>
        </div>
      </div>
    </div>
  );
};