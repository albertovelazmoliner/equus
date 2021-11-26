
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');
const dataReader = require('./data');
const dataDBReader = require('./dbData');
const dataParser = require('./parserData')

var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

const twilioClient = require('twilio')(accountSid, authToken, {
  logLevel: 'debug'
});

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

function createOptions(data) {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: data.email,
        subject: 'Happy birthday!',
        text: `Happy birthday, dear ${data.first_name}!`
    };
    return mailOptions;
}

async function sendMail() {
    // Read data from file
    // const data = await dataReader.readData();

    // Read data from DB
    const data = await dataDBReader.readDataFromDB()
    const selectedTargets = dataParser.getSelectedTargets(data);
    for (let i = 0; i < selectedTargets.length; i++) {
        const mailOptions = createOptions(selectedTargets[i]);
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log(
                    `Email sent:\nresponse: ${info.response}\naccepted: ${info.accepted}\nrejected: ${info.rejected}` );
            }
        });
    }
    
}

async function sendSMS() {
    // Read data from DB
    const data = await dataDBReader.readSMSDataFromDB()
    const selectedTargets = dataParser.getSelectedTargetsSMS(data);
    for (let i = 0; i < selectedTargets.length; i++) {
        const phone = selectedTargets[i].phone;
        twilioClient.messages
            .create({
                body: `Happy birthday, dear ${selectedTargets[i].first_name}!`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone
            })
            .then(message => console.log(message.sid));
    }
}



async function startSendMail(){
    console.log('job started');
    // Every day at 8:00 a.m.
    const job = new CronJob('0 0 8 * * *', async function() {
        await sendMail();
    }, null, true, 'America/Los_Angeles');
    job.start();
}

async function startSendSMS(){
    console.log('job started');
    // Every day at 8:00 a.m.
    const job = new CronJob('0 0 8 * * *', async function() {
        await sendSMS();
    }, null, true, 'America/Los_Angeles');
    job.start();
}

module.exports.startSendMail = startSendMail;
module.exports.startSendSMS = startSendSMS;
