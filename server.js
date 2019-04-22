// Load dependency
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {
    PORT,
    OFF_MESSAGE,
    ON_MESSAGE
} = require('./config/config');
const contrlMethod = require('./controllers/business-logic'); 

// Defind Constat required in this file
const DEVICE_OFF = OFF_MESSAGE;
const DEVICE_ON = ON_MESSAGE;

// Set the static folder path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

// Socket connection 
io.on('connection', (socket) => {
    socket.on('device-off', (data) => {
        let deviceStatusTime = `Device OFF at ${contrlMethod.getCurrentTime()}`;
        contrlMethod.getLogsInFS(deviceStatusTime);
        socket.broadcast.emit('broadcast', {
            socketId: data.socketId,
            deviceLogs: deviceStatusTime,
            deviceStatus: DEVICE_OFF
        });
    });

    socket.on('device-on', (data) => {
        let deviceStatusTime = `Device ON at ${contrlMethod.getCurrentTime()}`;
        contrlMethod.getLogsInFS(deviceStatusTime);
        socket.broadcast.emit('broadcast', {
            socketId: data.socketId,
            deviceLogs: deviceStatusTime,
            deviceStatus: DEVICE_ON
        });
    });
});

server.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`);
});