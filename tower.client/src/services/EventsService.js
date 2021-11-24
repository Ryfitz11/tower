import { AppState } from "../AppState"
import { Attendee } from "../Models/Attendee"
import { TowerEvent } from "../Models/Event"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
  async getAll(eventQuery = '') {
    const res = await api.get('api/events/' + eventQuery)
    logger.log(res.data)
    AppState.events = res.data.map(e => new TowerEvent(e))
  }
  async getById(id) {
    const res = await api.get('api/events/' + id)
    AppState.activeEvent = res.data
  }
  async getAttendeesByEventId(id) {
    const res = await api.get('api/events/' + id + '/attendees')
    AppState.attendees = res.data.map(a => new Attendee(a))
  }
  async createEvent(form) {
    const res = await api.post('api/events/', form)
    AppState.events.push(new Event(res.data))
  }
  async remove(eventId) {
    const res = await api.delete('api/events/' + eventId)
    AppState.events = AppState.events.filter(s => s.id !== eventId)

  }

}
export const eventsService = new EventsService()
