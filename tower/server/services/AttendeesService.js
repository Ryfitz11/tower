import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { towerEventsService } from './TowerEventsService'

class AttendeesService {
  async create(body) {
    const event = await towerEventsService.getById(body.eventId)
    const found = await dbContext.Attendees.findOne({ eventId: body.eventId, accountId: body.accountId })
    if (found || event.capacity === 0) {
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

  async remove(ticketId, userId) {
    const ticket = await dbContext.Attendees.findById(ticketId)
    const event = await towerEventsService.getById(ticket.eventId)

    if (ticket.accountId.toString() !== userId) {
      throw new Forbidden('Invalid Id')
    }
    await dbContext.Attendees.findByIdAndDelete(ticketId)
    event.capacity++
    await event.save()
  }
}

export const attendeesService = new AttendeesService()
