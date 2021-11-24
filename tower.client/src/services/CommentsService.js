import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"
class CommentsService {
  async getAll(eventId) {
    const res = await api.get('api/events/' + eventId + 'comments')
    logger.log(res.data)
    AppState.comments = res.data.map(e => new Comment(e))
  }
  async create(data) {
    Pop.toast('created', 'success')
    const res = await api.post('api/comments/', data)
    AppState.comments.push = (new Comment(res.data))
  }
  async remove(commentId) {
    const res = await api.delete('api/comments/' + commentId)
    AppState.comments = AppState.comments.filter(c => c.id !== commentId)
  }
}
export const commentsService = new CommentsService()