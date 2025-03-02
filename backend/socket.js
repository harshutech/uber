const socketIo = require('socket.io');
const usermodel = require('./models/user.models');
const captainmodel = require('./models/captain.models');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        console.log('a user connected:', socket.id);
        
        socket.on('join', async (data) => {
            const { userId, userType } = data;
            if (userType === 'user') {
                await usermodel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainmodel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('update-location-captain', async (data, callback) => {
            const { userId, location } = data;

            // console.log('Received location update:', data);

            if (!location || !location.ltd || !location.lng) {
                const errorMsg = 'Invalid location';
                console.error(errorMsg);
                return callback({ status: 'error', message: errorMsg });
            }

            try {
                await captainmodel.findByIdAndUpdate(userId, {
                    $set: {
                        location: {
                            type: "Point",
                            coordinates: [location.lng, location.ltd], // GeoJSON format [longitude, latitude]
                        },
                    },
                });
                // callback({ status: 'success', message: 'Location updated successfully' });
            } catch (error) {
                console.error('Error updating location:', error);
                // callback({ status: 'error', message: 'Failed to update location' });
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected:', socket.id);
        });
    });
}

function sendMsgToSocketId(socketId, msgobject) {
    console.log('Sending message to:', socketId);
    if (io) {
        io.to(socketId).emit(msgobject.event,msgobject.data);
    } else {
        console.log('Socket not initialized');
    }
}

module.exports = {
    initializeSocket,
    sendMsgToSocketId
};