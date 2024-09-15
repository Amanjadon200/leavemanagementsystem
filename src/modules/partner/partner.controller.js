import Partner from './model/partner.model.js';

const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find();
        res.json({ statusCode: 200, data: partners, error: null, message: "Partners retrieved successfully" });
    } catch (err) {
        res.json({ statusCode: 500, data: null, error: err.message, message: "Error retrieving partners" });
    }
};

const getPartnerSchedule = async (req, res) => {
    const { id } = req.params;

    try {
        const partner = await Partner.findById(id);
        if (!partner) {
            return res.status(404).json({ statusCode: 404, data: null, error: 'Partner not found', message: 'Error retrieving partner schedule' });
        }

        res.json({ statusCode: 200, data: partner.schedule, error: null, message: "Partner schedule retrieved successfully" });
    } catch (err) {
        res.json({ statusCode: 500, data: null, error: err.message, message: "Error retrieving partner schedule" });
    }
};
export { getAllPartners, getPartnerSchedule }