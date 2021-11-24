export class Attendee {
  constructor(eventData = {}) {
    this.id = eventData.id
    this.eventId = eventData.eventId
    this.accountId = eventData.accountId
    this.event = eventData.event || {}
    this.account = eventData.account || {}
  }
}