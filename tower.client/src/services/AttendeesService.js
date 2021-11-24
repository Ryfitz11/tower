import { AppState } from "../AppState"
import { Attendee } from "../Models/Attendee"
import { api } from "./AxiosService"

class AttendeesService {
  async getAll(attendeeQuery = '') {
    const res = await api.get('api/attendees/' + attendeeQuery)
    logger.log(res.data)
    AppState.attendees = res.data.map(e => new Attendee(e))
  }
  async createAttendee(userId, eventId) {
    const res = await api.post('api/attendees/', { accountId: userId, eventId: eventId })
    AppState.attendees.push(new Attendee(res.data))
    AppState.activeEvent.capacity--
  }
  async removeAttendee(id) {
    const res = await api.delete('api/attendees/' + id)
    AppState.attendees = AppState.attendees.filter(a => a.id !== id)
    AppState.activeEvent.capacity++

  }

}
export const attendeesService = new AttendeesService()