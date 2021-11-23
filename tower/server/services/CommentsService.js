import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { towerEventsService } from './TowerEventsService'

class CommentsService {
  async create(body) {
    const event = await towerEventsService.getById(body.eventId)
    const comment = await dbContext.Comments.create(body)
    await event.save()
    await comment.populate('creator event')
    return comment
  }

  async getComments(query = {}) {
    const found = await dbContext.Comments.find(query).populate('creator event')
    if (!found) {
      throw new BadRequest('Invalid Id')
    }
    return found
  }

  async remove(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (comment.accountId.toString() !== userId) {
      throw new Forbidden('')
    }
    await dbContext.Comments.findByIdAndDelete(commentId)
  }
}
export const commentsService = new CommentsService()
