const htmlCreator = (mode, data) => {
  let subject = '',
    body = '',
    text = '';
  if (mode === 'par') {
    subject = 'Congratulations!! Registration successful';
    body = `
   <h3>Hey ${data.client.fullName} your registration for INIT 3.0 as a Participant is successful.</h3>
   <p>Don't delay to participate in the interesting events arranged by NDITC. Stay tuned for all the latest updates<br/> 
   <strong>You will find more details on your profile</strong>
   </p>
   <h2 align="center" style="margin-top:20px;background-color:rgb(0,0,0); color:rgb(255,255,255)">Your code is: ${data.event.clientQR}</h2>
    <br>
   
  `;
  } else if (mode === 'ca') {
    subject = 'Congratulations!! Registration successful';
    body = `
   <h3>Hey ${data.client.fullName} your registration as a CA for INIT 3.0 is successful.</h3>
   <p>Share the code.<br/>
    <strong>You will find more details on your profile</strong>
   </p>
   <h2 align="center" style="margin-top:20px;background-color:rgb(0,0,0); color:rgb(255,255,255)">Your reference code is: ${data.event.clientQR}</h2>
   <br>
   
  `;
  } else if (mode === 'resetPass') {
    subject = 'Here is your OTP!!';
    body = `
    <h3>Please use this to reset your password</h3>
    <h2 align="center" style="margin-top:20px;background-color:rgb(0,0,0); color:rgb(255,255,255)">${data.info.otp}</h2><br>
     --Notre Dame Information Technology Club
    `;
  } else if (mode === 'eventVerified') {
    subject = 'Paticipation requrest confirmed';
    body = `
      <h3>Hey ${data.client.fullName} your participation request for ${
      data.info.eventName
    } is successful</h3>
   <p>
   Note:<strong>${
     data.info.paid
       ? 'You will get your payment verification mail after being verified by the admin'
       : ''
   }<strong>
   <br>
    Don't forget to stay updated visiting our FB page and website regularly.
   </p>
   <br>
    `;
  } else if (mode === 'teamEventVerify') {
    subject = 'Paticipation request confirmed';
    body = `
      <h3>Hey ${data.client.fullName} your participation request for ${
      data.info.eventName
    } is successful</h3>
   <p>
   Note: <strong>${
     data.info.paid
       ? 'You will get your payment verification mail after being verified by the admin'
       : ''
   }</strong><br>

    You were seleted as the leader of ${data.info.teamName}.    
    <strong>Your team mates are: </strong><br>
    <ol>
    ${data.info.members
      .map((member) => {
        return `
          <li>${member.fullName} - ${member.email} </li>
        `;
      })
      .join('')}
    </ol>

   <br>
    Don't forget to stay updated visiting our FB page and website regularly.
   </p>
    `;
  } else if (mode === 'paymentVerify') {
    subject = `Payment ${data.info.type ? 'successful' : 'unsuccessful'}`;
    body = `
    <h3>Hey ${data.client.fullName} your payment for ${data.info.eventName} ${
      data.info.type
        ? 'is successful'
        : 'is not proper or something wrong happened. please contact to the admin for this <br> <a href="https://init.nditc.net/contact">Contact us</a>'
    }. You will also see changes in your profile in the payment section</h3>
    `;
  } else if (mode === 'TIDChange') {
    const { transactionObj, previousObj } = data.info;
    let transactionArray = [];
    for (let event in previousObj) {
      transactionArray.push({ event, tID: previousObj[event] });
    }
    subject = `Transaction ID changed`;
    body = `
        hey <strong>${
          data.client.fullName
        }</strong>, please check your changed transations ID status: <br/>
        <ol>
          ${transactionArray
            .map((item) => {
              return `<li><strong style="color:rgb(18, 96, 77)">${
                item.event
              }:   </strong>  ${previousObj[item.event]} -> <strong>${
                transactionObj[item.event]
              }</strong></li>`;
            })
            .join('')}
        </ol><br/><br/>
        <h3>let us know if it was not you: <h3>
        <a href="https://init.nditc.net/contact">https://init.nditc.net/contact</a>
    `;
  } else if (mode === 'custom') {
    subject = `${data.info.subject}`;
    text = `${data.client.fullName ? `Dear ${data.client.fullName}, ` : ''} ${
      data.info.body
    }\n\n`;
  }
  return { subject, body, text };
};

module.exports = { htmlCreator };
