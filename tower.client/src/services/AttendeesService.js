class AttendeesService {
  async getAll(attendeeQuery = '') {
    const res = await api.get('api/attendees' + attendeeQuery)
    logger.log(res.data)
    AppState.attendees = res.data.map(e => new Attendee(e))
  }
}
export const attendeesService = new AttendeesService()