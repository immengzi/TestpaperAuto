import mongoose, {Schema} from 'mongoose';
import {v4 as uuidv4} from 'uuid';

const userSchema = new Schema({
    _id: {type: String, default: () => uuidv4()},
    email: {type: String, unique: true, required: true},
    username: {type: String, required: true},
    hash: {type: String, required: true},
    role: {type: String, enum: ['User', 'Admin'], required: true}
}, {
    timestamps: true
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);