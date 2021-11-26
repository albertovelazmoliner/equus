const FEBRUARY_28TH = '/02/28';
const FEBRUARY_29TH = '/02/29';

function getTodayWithFormat() {
    const today = new Date();
    const month = today.getUTCMonth() + 1; //months from 1-12
    const day = today.getUTCDate();

    return "/" + month + "/" + day;
}

function is28thFebruary(date) {
    return date === FEBRUARY_28TH;
}

function is29thFebruary(date) {
    return date === FEBRUARY_29TH;
}

function getBirthdayDayAndMonth(data) {
    return data.date_of_birth.substr(data.date_of_birth.indexOf('/'))
}

function getSelectedTargets(data) {
    let todayDate = getTodayWithFormat();
    let selectedTargets = [];

    if (is29thFebruary(todayDate)) {
        return selectedTargets;
    }

    for (let i = 0; i < data.length; i++) {
        if (is28thFebruary(todayDate)) {
            if (is29thFebruary(getBirthdayDayAndMonth(data[i]))) {
                selectedTargets.push(data[i]);
            }
        } else {
            if (getBirthdayDayAndMonth(data[i]) === todayDate) {
                selectedTargets.push(data[i]);
            }
        }
    }
    return selectedTargets;
}

module.exports.getSelectedTargets = getSelectedTargets;