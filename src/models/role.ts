import mongoose, { model, Model, Schema} from 'mongoose'

const RoleSchema = new Schema({
    role: { type: String, required: [true, 'Role is required'] }
})

RoleSchema.methods.toJSON = function () {
    const { _id, ...role } = this.toObject()

    return role
}

const Role: Model<{role: string}> = mongoose.models.Role || model('Role', RoleSchema)

export default Role