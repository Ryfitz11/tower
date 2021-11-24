<template>
  <div class="py-1 border border-dark d-flex justify-content-between">
    {{ comment.body }}
    <i
      v-if="account.id == comment.creatorId"
      @click="remove()"
      class="selectable mdi mdi-trash-can-outline bg-danger"
    ></i>
  </div>
  <br />
  <div class="pb-3 d-flex justify-content-end">
    <img :src="comment.creator.picture" alt="" /> {{ comment.creator.name }}
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { commentsService } from "../services/CommentsService"

export default {
  setup() {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async remove() {
        try {
          const commentId = props.comment.id
          await commentsService.remove(commentId, route.params.projectId)
        } catch (error) {
          logger.error(error)

        }
      }
    }
  }
}
</script>

<style>
</style>