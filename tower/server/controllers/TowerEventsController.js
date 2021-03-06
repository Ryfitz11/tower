import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import { commentsService } from '../services/CommentsService'
import { towerEventsService } from '../services/TowerEventsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/attendees', this.getAttendeesByEvent)
      .get('/:id/comments', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.cancel)
  }

  // getAttendeesByEvent needs to find all the attendees for a single event.
  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getComments({ eventId: req.params.id })
      logger.log('getAttendeesByEvent', comments)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getAttendeesByEvent(req, res, next) {
    try {
      const towerEvent = await attendeesService.getAttendeesByEvent(req.params.id)
      logger.log('getAttendeesByEvent', towerEvent)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.create(req.body)
      // logger.log('eventController', towerEvent)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const towerEvent = await towerEventsService.getAll(query)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getById(req.params.id)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      delete req.body.isCanceled
      const towerEvent = await towerEventsService.edit(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancel(req, res, next) {
    try {
      const userId = req.userInfo.id
      const eventId = req.params.id
      // logger.log(eventId)
      const canceledEvent = await towerEventsService.cancel(userId, eventId)
      return res.send(canceledEvent)
    } catch (error) {
      next(error)
    }
  }
}
