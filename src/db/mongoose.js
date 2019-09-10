import mongoose from 'mongoose';

const databaseURL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/myetf'

mongoose
	.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	}).then(() => {
		console.log(`Database is connected at ${databaseURL}`);
	}).catch(err => {
		console.log(`Could not connect to ${databaseURL}`);
		console.log(`${err}`);
	});