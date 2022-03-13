import mongoose, { model, Model, Schema } from "mongoose";
import { IUser } from "interfaces";

const UserSChema = new Schema(
    {
    name    : { type: String, required: [true, 'Name is required'], trim: true },
    email   : { type: String, required: [true, 'Email is required'], trim: true, unique: true },
    password: { type: String, required: [true, 'Password is required'], trim: true },
    img     : { type: String},

    role    : { type: String, required: true, emun: ['ADMIN_ROLE', 'USER_ROLE'] },
    
    state   : { type: Boolean, default: true },
    google  : { type: Boolean, default: false }

}, { timestamps: true }
);

UserSChema.methods.toJSON = function () {
    const { __v, _id, ...user } = this.toObject()
    user.id = _id
    // return { user, id: _id}
    return user
}

const User: Model<IUser> = mongoose.models.User || model("User", UserSChema);

export default User;