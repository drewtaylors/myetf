import mongoose from 'mongoose';

const fundSchema = new mongoose.Schema({
	ticker: {
		type: String,
		unique: true
	},
	name: {
		type: String,
		unique: true
	}
}, {
	timestamps: true
});

const Fund = mongoose.model('Fund', fundSchema);

export default Fund;