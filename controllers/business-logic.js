const fs = require('fs');
const PATH = '/Users/nilaratan/honeywell-code-test/device-state-monitor/public/logs/log-20-march-2019.txt';

exports.getCurrentTime = () => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    currentTime = `${h} : ${m} : ${s}`;

    return currentTime;
};

exports.writeLogInFS = content => {
    fs.writeFile(PATH, content, error => {
        if (error) console.log('Error:', error);
    });
};

exports.getLogsInFS = content => {
    fs.readFile(PATH, (error, fileContnet) => {
        if (error) console.log('Error:', error);
        let updateFileContent = `${fileContnet} \n ${content}`;
        this.writeLogInFS(updateFileContent);
    });
};