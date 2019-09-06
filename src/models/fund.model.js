import mongoose from 'mongoose';

const fundSchema = new mongoose.Schema({
	ticker: {
		type: String,
	},
	name: {
		type: String
	}
}, {
	timestamps: true
});

const Fund = mongoose.model('Fund', fundSchema);

export default Fund;