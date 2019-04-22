$(function () {
    // Client socket

    var socketURL = 'http://localhost:9090';
    var socket = io.connect(socketURL);

    // Toggle the Device Button and Emit messages

    $('#deviceButton').click(function (e) {
        $(this).toggleClass('btn-disable-class');
        if ($(this).hasClass('btn-disable-class')) {
            $(this).text('Off');
            socket.emit('device-off', {
                socketId: socket.id,
            });
        } else {
            $(this).text('ON');
            socket.emit('device-on', {
                socketId: socket.id,
            });
        }
    });

    // Boardcast message to client except Sender

    socket.on('broadcast', data => {
        if (data.socketId != socket.id) {
            $('#deviceStatus').text(data.deviceStatus);
            $('#hide-content').hide();
        }
        var dumpDeviceLogs = $('#dumpDeviceLogs');
        dumpDeviceLogs.show();
        if (dumpDeviceLogs.children().length == 10) {
            dumpDeviceLogs
                .children()
                .first()
                .remove();
        }
        dumpDeviceLogs.append('<p>' + data.deviceLogs + '</p>');
    });
});
