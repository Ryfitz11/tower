import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
  body: { type: String, required: true },
  eventId: { type: ObjectId, required: true, ref: 'TowerEvent' },
  accountId: { type: ObjectId, required: true, ref: 'Account' }
},
{ timestamps: true, toJSON: { virtuals: true } }
)
CommentSchema.index({ eventId: 1, accountId: 1 }, { unique: true })

CommentSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'TowerEvent',
  justOne: true
})

CommentSchema.virtual('creator', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
