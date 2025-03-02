'use client';
import styles from '@/components/Messages/ReplyBox.module.css';

interface ReplyBoxProps {
  name: string;
  institution: string;
  email: string;
  sentTime: string;
  replyTime: string;
  originalMessage: string;
  replyMessage: string;
}

export const ReplyBox = ({
  name,
  institution,
  email,
  sentTime,
  replyTime,
  originalMessage,
  replyMessage,
}: ReplyBoxProps) => {
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
        <div className={styles.timeInfo}>
          <p className={styles.timeEntry}>{sentTime}</p>
          <p className={styles.timeEntry}>{replyTime}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        {/* Original Message */}
        <div className={styles.messageViewer}>
          <p className={styles.messageContent}>{originalMessage}</p>
        </div>

        {/* Divider Line */}
        <div className={styles.divider} />

        {/* Reply Message */}
        <div className={styles.replyViewer}>
          <p className={styles.messageContent}>{replyMessage}</p>
        </div>
      </div>
    </div>
  );
};