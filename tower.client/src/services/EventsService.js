import { AppState } from "../AppState"
import { Event } from "../Models/Event"
import { logger } from "../utils/Logger"

class EventsService {
  async getAll(eventQuery = '') {
    const res = await api.get('api/events' + eventQuery)
    logger.log(res.data)
    AppState.events = res.data.map(e => new Event(e))
  }
}
export const eventsService = new EventsService()
