require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 4002;

app.listen(PORT, (err) => {
	if (err) console.log(err);
	else console.log(`Server running successfully on port ${PORT}`);
});