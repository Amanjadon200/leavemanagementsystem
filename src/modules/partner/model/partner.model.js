import mongoose, { Schema } from 'mongoose';
const PartnerSchema = new Schema({
    name: { type: String, required: true },
    schedule: {
        type: Map,
        of: [{ start: String, end: String }],

    },
});
const Partner = mongoose.model('Partner', PartnerSchema);
export default Partner;
