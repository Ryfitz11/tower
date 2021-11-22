import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { towerEventsService } from './TowerEventsService'

class AttendeesService {
  async create(body) {
    const event = await towerEventsService.getById(body.eventId)
    const found = await dbContext.Attendees.findOne({ eventId: body.eventId, accountId: body.accountId })
    if (found) {
      throw new BadRequest('You are already attending that event')
    }
    const attendee = await dbContext.Attendees.create(body)
    event.capacity--
    await event.save()
    await attendee.populate('account event')
    return attendee
  }

  async getMyEvents(userInfo) {
    const found = await dbContext.Attendees.find({ accountId: userInfo.id }).populate('event')
    if (!found) {
      throw new BadRequest('Invalid Id')
    }
    return found
  }

  async getAttendeesByEvent(id) {
    const towerEvent = await dbContext.Attendees.find({ eventId: id }).populate('event account')
    if (!towerEvent) {
      throw new BadRequest('Invalid Id')
    }
    return towerEvent
  }
}

export const attendeesService = new AttendeesService()
