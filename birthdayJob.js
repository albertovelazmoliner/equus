
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');
const dataReader = require('./data');
const dataParser = require('./parserData')

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
    const data = await dataReader.readData();
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
async function start(){
    console.log('job started');
    // Every day at 8:00 a.m.
    const job = new CronJob('0 0 8 * * *', async function() {
        await sendMail();
    }, null, true, 'America/Los_Angeles');
    job.start();
}

module.exports.start = start;
