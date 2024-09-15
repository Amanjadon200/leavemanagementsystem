import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
    partnerId: { type: Schema.Types.ObjectId, ref: 'Partner', required: true },
    name: { type: String },
    city: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    slots: [{ start: String, end: String }],
    status: { type: String, enum: ['PENDING', 'APPROVED', 'DENIED'], default: 'PENDING' },
});
const Leave = mongoose.model('Leave', LeaveSchema);
export default Leave;
