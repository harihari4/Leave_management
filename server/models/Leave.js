import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", require: true},
    leaveType: {
        type: String,
        enum: ["sick Leave", "Casual Leave", "Annual Leave"],
        required: true,
    },
    startDate: {type: Date, require: true},
    endDate: { type:Date, require: true },
    reason: { type: String, require: true,  },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    appliedAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
});

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;