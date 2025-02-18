import React, { useState } from "react";
import styles from "@components/Messages/msgBox.module.css";

interface MessageBoxProps {
  senderName: string;
  institution: string;
  email: string;
  message: string;
  sentTime: string;
  //define prop here
}

const MessageBox: React.FC<MessageBoxProps> = ({
  senderName,
  institution,
  email,
  message,
  sentTime,
  //define any props here too if is imported from backend
}) => {
  const [isReplied, setIsReplied] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const toggleReplyStatus = () => setIsReplied(!isReplied);

  const handleSendClick = () => {
    setButtonClicked(true);
    //add a function to take the userReply back to server

    setTimeout(() => setButtonClicked(false), 1000);
  };

  return (
    <div className={styles.container}>
      {
        //This is the top section of the box
      }
      <div className={styles.topSection}>
        <div className={styles.senderInfo}>
          <h2 className={styles.senderName}>{senderName}</h2>
          <p className={styles.institution}>{institution}</p>
          <p className={styles.email}>{email}</p>
        </div>
        <div className={styles.topRight}>
          <button className={styles.ignoreButton}>Ignore</button>
          <span className={styles.sentTime}>{sentTime}</span>
        </div>
      </div>

      {
        //This is the main section of the box
      }
      <div className={styles.mainSection}>
        <div className={styles.messageViewer}>{message}</div>
        <div className={styles.replyBox}>
          <textarea
            placeholder="Write your reply here..."
            className={styles.replyField}
          />
          <button
            className={`${styles.sendButton} ${
              buttonClicked ? styles.clicked : ""
            }`}
            onClick={handleSendClick}
          >
            {buttonClicked ? "✔" : "➤"}
            {
              //Import a url to validate these icons
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
