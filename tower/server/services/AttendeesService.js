import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { towerEventsService } from './TowerEventsService'

class AttendeesService {
  async create(body) {
    await towerEventsService.getById(body.towerEventId)
    const found = await dbContext.Attendees.findOne({ eventId: body.eventId, accountId: body.accountId })
    if (found) {
      throw new BadRequest('You are already attending that event')
    }
    body.capacity--
    const attendee = await dbContext.Attendees.create(body)
    return attendee.populate('account towerEvent')
  }
}

export const attendeesService = new AttendeesService()
