import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class TowerEventsService {
  async create(body) {
    const newTowerEvent = await dbContext.TowerEvents.create(body)
    logger.log('towerEventService ', newTowerEvent)
    return newTowerEvent.populate('creator', 'name')
  }

  async getAll(query = {}) {
    return await dbContext.TowerEvents.find(query).populate('creator', 'name')
  }

  async getById(id) {
    const towerEvent = await dbContext.TowerEvents.findById(id).populate('creator', 'name')
    if (!towerEvent) {
      throw new BadRequest('Invalid Id')
    }
    return towerEvent
  }

  async edit(body) {
    const towerEvent = await this.getById(body.id)
    if (towerEvent.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('you do not have the credentials to change this towerEvent')
    }
    return dbContext.TowerEvents.findByIdAndUpdate(body.id, body, { new: true })
  }

  // remove function will change iscanclled to true.  needs userid and the eventId. fedEx is good ref doesnt check for creator
  //   async cancel(userId, eventId) {
  //     const towerEvent = await this.getById(eventId)

//     if (towerEvent.creatorId.toString() !== userId) {
//       throw new Forbidden('you do not have the credentials t')
//     }
//   }
}
export const towerEventsService = new TowerEventsService()
