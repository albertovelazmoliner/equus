const fs = require('fs');

async function readData() {
    const data = fs.readFileSync("data.txt");
    let array = data.toString().split("\n");
    let result = [];
    
    let headers = array[0].split(", ")
    for (let i = 1; i < array.length; i++) {
        let obj = {}
        let str = array[i]
        let properties = str.split(", ")

        for (let j in headers) {
            if (properties[j].includes(", ")) {
            obj[headers[j]] = properties[j]
                .split(", ").map(item => item.trim())
            } else {
                obj[headers[j]] = properties[j]
            }
        }
        result.push(obj);
    }
    return result;
}

module.exports.readData = readData;