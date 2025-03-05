'use client';
import { useState } from 'react';
import styles from '@/components/Messages/MsgBox.css';

interface MessageBoxProps {
  name: string;
  institution: string;
  email: string;
  timestamp: string;
  message: string;
}

export const MessageBox = ({
  name,
  institution,
  email,
  timestamp,
  message,
}: MessageBoxProps) => {
  const [isSent, setIsSent] = useState(false);

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <div className={styles.topSection}>
        {/* Left Side */}
        <div className={styles.userInfo}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.institution}>{institution}</p>
          <p className={styles.email}>{email}</p>
        </div>

        {/* Right Side */}
        <div className={styles.messageMeta}>
          <span className={styles.timestamp}>{timestamp}</span>
          <button className={styles.ignoreButton} type="button">
            Ignore
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        {/* Message Viewer */}
        <div className={styles.messageViewer}>
          <p className={styles.messageContent}>{message}</p>
        </div>

        {/* Reply Input */}
        <div className={styles.replySection}>
          <input
            type="text"
            placeholder="Type your reply..."
            className={styles.replyInput}
          />
          <button
            className={`${styles.sendButton} ${isSent ? styles.sent : ''}`}
            onClick={() => setIsSent(!isSent)}
            type="button"
          >
            <div className={styles.sendIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};