const EmailCover = (body) => {
  return (
    body +
    `<p>Regards, <br>
    Notre Dame Information Technology Club <br>
    NOTRE DAME COLLEGE, MOTIJHEEL, DHAKA-1000 <br>
    <hr>
    For any queries, please contact us through our <a href="https://www.facebook.com/nditc.official">Facebook page</a><br>
    You can also contact us through our website's <a href="https://init.nditc.net/contact">Contact page</a> . You will find detailed info there.<br>
    Or mail us at <a href="mailto:nditc.official@gmail.com">nditc.official@gmail.com</a> 
   </p>
 `
  )
}

const EmailTextCover = (text) => {
  return (
    text +
    `
Notre Dame Information Technology Club
NOTRE DAME COLLEGE, MOTIJHEEL, DHAKA-1000\n
For any queries, please contact us through https://www.facebook.com/nditc.official 
You can also contact us through our website: https://init.nditc.net/contact. You will find detailed info there.
Or mail us at: nditc.official@gmail.com
 `
  )
}

module.exports = { EmailCover, EmailTextCover }
