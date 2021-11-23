<template>
  <h1>This is the Event Details page</h1>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { useRoute, useRouter } from "vue-router"
import { eventsService } from "../services/EventsService"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async () => {
      try {
        await eventsService.getAll(route.params.id)
      } catch (error) {
        logger.error(error);
      }
    })
    return {
      towerEvent: computed(() => AppState.events),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style>
</style>