import Leave from './model/leave.model.js'

const checkOverlappingLeaves = async (partnerId, startDate, endDate, slots) => {
    const leaves = await Leave.find({ partnerId, status: { $ne: 'DENIED' } });
    for (const leave of leaves) {
        if ((new Date(startDate).getTime()=== new Date(leave.startDate).getTime()) && (new Date(endDate).getTime()=== new Date(leave.endDate).getTime())){
                for (const slot of leave.slots) {
                    for (const newSlot of slots) {
                        if (slot.start === newSlot.start && slot.end === newSlot.end) {
                            return true;
                        }
                    }
                }
            }
        else if (new Date(startDate) <= new Date(leave.endDate) && new Date(endDate) >= new Date(leave.startDate)) {
            return true;
        }
    }
    return false;
};

const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('partnerId');
        res.json({ statusCode: 200, data: leaves, error: null, message: "Leaves retrieved successfully" });
    } catch (err) {
        res.json({ statusCode: 500, data: null, error: err.message, message: "Error retrieving leaves" });
    }
};

const createLeave = async (req, res) => {
    const { partnerId, startDate, endDate, slots } = req.body;

    try {
        // Check for overlapping leaves
        const isOverlapping = await checkOverlappingLeaves(partnerId, startDate, endDate, slots);
        if (isOverlapping) {
            return res.status(400).json({ statusCode: 400, data: null, error: 'Leave period overlaps with existing leave', message: 'Error creating leave' });
        }
        const leave = await Leave.create({ partnerId, startDate, endDate, slots });

        res.json({ statusCode: 201, data: leave, error: null, message: "Leave created successfully" });
    } catch (err) {
        res.json({ statusCode: 500, data: null, error: err.message, message: "Error creating leave" });
    }
};

const updateLeave = async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate, slots, status } = req.body;

    try {
        const leave = await Leave.findById(id);
        if (!leave) {
            return res.status(404).json({ statusCode: 404, data: null, error: 'Leave not found', message: 'Error updating leave' });
        }

        // Check for overlapping leaves if status is not DENIED
        if (status !== 'DENIED') {
            const isOverlapping = await checkOverlappingLeaves(leave.partnerId, startDate, endDate, slots);
            if (isOverlapping) {
                return res.status(400).json({ statusCode: 400, data: null, error: 'Leave period overlaps with existing leave', message: 'Error updating leave' });
            }
        }

        leave.startDate = startDate;
        leave.endDate = endDate;
        leave.slots = slots;
        leave.status = status;

        await leave.save();
        res.json({ statusCode: 200, data: leave, error: null, message: "Leave updated successfully" });
    } catch (err) {
        res.json({ statusCode: 500, data: null, error: err.message, message: "Error updating leave" });
    }
};
export { createLeave, updateLeave, getAllLeaves }