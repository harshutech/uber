const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 3000;
const cors = require('cors');

const server = http.createServer(app);

initializeSocket(server);
app.use(cors());

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});