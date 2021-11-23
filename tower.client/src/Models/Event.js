export class TowerEvent {
  constructor(eventData = {}) {
    this.id = eventData.id
    this.name = eventData.name
    this.description = eventData.description
    this.coverImg = eventData.coverImg
    this.location = eventData.location
    this.capacity = eventData.capacity
    this.startDate = eventData.startDate
    this.isCanceled = eventData.isCanceled
    this.type = eventData.type
    this.creator = eventData.creator || {}
  }
}