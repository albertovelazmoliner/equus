require('dotenv').config()
const birthdayJob = require('./birthdayJob');

(async function() {
    console.log('Starting...');
    await birthdayJob.start();
})();