import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const AttendeeSchema = new Schema(
  {
    eventId: { type: ObjectId, required: true, ref: 'Event' },
    accountId: { type: ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
AttendeeSchema.index({ eventId: 1, accountId: 1 }, { unique: true })

AttendeeSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'Event',
  justOne: true
})

AttendeeSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
