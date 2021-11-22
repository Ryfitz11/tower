import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { towerEventsService } from './TowerEventsService'

class CommentsService {
  async create(body) {
    const event = await towerEventsService.getById(body.eventId)
    const comment = await dbContext.Comments.create(body)
    await event.save()
    await comment.populate('creator event')
    return comment
  }
}

export const commentsService = new CommentsService()
