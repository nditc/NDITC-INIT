import React from "react";
import styles from "@components/Messages/replyBox.module.css";

interface ReplyBoxProps {
  name: string;
  institution: string;
  email: string;
  sentTime: string;
  replyTime: string;
  messageText: string;
  replyText: string;
  //fetch this data from backend
}

const ReplyBox: React.FC<ReplyBoxProps> = ({
  name,
  institution,
  email,
  sentTime,
  replyTime,
  messageText,
  replyText,
}) => {
  return (
    <div className={styles.replyBox}>
      {
        //User info
      }
      <div className={styles.header}>
        <div className={styles.nameSection}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.institution}>{institution}</p>
          <p className={styles.email}>{email}</p>
        </div>
        {
          // Date and Time info of the message and reply
        }
        <div className={styles.timestamps}>
          <p className={styles.sentTime}>Sent: {sentTime}</p>
          <p className={styles.replyTime}>Reply: {replyTime}</p>
        </div>
      </div>

      {
        //Message and reply viewer section
      }
      <div className={styles.bottom}>
        <div className={styles.messageViewer}>{messageText}</div>
        <div className={styles.divider}></div>
        <div className={styles.replyViewer}>{replyText}</div>
      </div>
    </div>
  );
};

export default ReplyBox;
