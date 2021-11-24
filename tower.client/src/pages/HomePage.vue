<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-2"><button @click="type = ''">All</button></div>
      <div class="col-2">
        <button @click="type = 'concert'">Concert</button>
      </div>
      <div class="col-2">
        <button @click="type = 'convention'">Convention</button>
      </div>
      <div class="col-2"><button @click="type = 'sport'">Sport</button></div>
      <div class="col-2">
        <button @click="type = 'digital'">Digital</button>
      </div>
    </div>
    <div v-if="type == ''" class="row">
      <div class="col-4" v-for="e in events" :key="e.id">
        <Event :towerEvent="e" />
      </div>
    </div>
    <div v-else class="row">
      <div class="col-4" v-for="e in filterEvents" :key="e.id">
        <Event :towerEvent="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core"
import { eventsService } from "../services/EventsService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
export default {

  setup() {
    const type = ref('')

    onMounted(async () => {
      try {
        await eventsService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      events: computed(() => AppState.events),
      filterEvents: computed(() => AppState.events.filter(e => e.type == type.value)),
      type
    }
  }
}
</script>

<style scoped lang="scss">
// .home {
//   display: grid;
//   height: 80vh;
//   place-content: center;
//   text-align: center;
//   user-select: none;
//   .home-card {
//     width: 50vw;
//     > img {
//       height: 200px;
//       max-width: 200px;
//       width: 100%;
//       object-fit: contain;
//       object-position: center;
//     }
//   }
// }
</style>
