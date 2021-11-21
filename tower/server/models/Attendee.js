import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const AttendeeSchema = new Schema({
  accountId: { type: ObjectId, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

AttendeeSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true

})
