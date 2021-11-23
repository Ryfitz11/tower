class CommentsService {
  async getAll(commentQuery = '') {
    const res = await api.get('api/comments' + commentQuery)
    logger.log(res.data)
    AppState.comments = res.data.map(e => new Comment(e))
  }
}
export const commentsService = new CommentsService()