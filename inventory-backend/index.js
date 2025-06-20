const app = require('./app');
const connectDB = require('./src/config/db');
const PORT = 8080;

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    });
})

