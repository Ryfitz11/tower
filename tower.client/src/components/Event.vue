<template>
  {{ events.name }}
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"

export default {
  setup() {
    onMounted(async () => {
      try {
        await eventsService.getAll()
      } catch (error) {
        logger.log(error)
        Pop.toast('Something went wrong', 'error')
      }
    })
    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style>
</style>