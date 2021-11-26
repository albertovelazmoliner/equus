require('dotenv').config()
const birthdayJob = require('./birthdayJob');

(async function() {
    console.log('Starting...');
    // Send email
    await birthdayJob.startSendMail();
    // Send SMS
    await birthdayJob.startSendSMS();
})();