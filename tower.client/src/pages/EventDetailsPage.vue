<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <img class="img-fluid" :src="towerEvent.coverImg" alt="" />
      </div>
      <div class="col-9">
        <div class="row">
          <h1>
            {{ towerEvent.name }}
          </h1>
          <h5>{{ towerEvent.location }}</h5>
          <h6>Date: {{ towerEvent.startDate?.split("T")[0] }}</h6>
        </div>
        <div class="row">
          {{ towerEvent.description }}
        </div>
        <div class="row justify-content-between align-self-end">
          <div class="col-3">{{ towerEvent.capacity }} tickets left</div>
          <button v-if="attendee?.id" @click="removeAttendee()" class="col-3">
            Un-attend
          </button>
          <button v-else @click="createAttendee()" class="col-3">Attend</button>
        </div>
      </div>
    </div>
    <div class="row AllAttendees">
      <p>All the profiles who attended this event</p>
      <div v-for="b in attendees" :key="b.id">
        <img :src="b.account.picture" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { useRoute, useRouter } from "vue-router"
import { eventsService } from "../services/EventsService"
import { attendeesService } from "../services/AttendeesService"
import Pop from "../utils/Pop"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async () => {

      try {
        await eventsService.getById(route.params.id)
        await eventsService.getAttendeesByEventId(route.params.id)
      } catch (error) {
        logger.error(error);
      }

    })
    return {
      towerEvent: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      attendee: computed(() => AppState.attendees.find(a => a.accountId == AppState.account.id)),
      attendees: computed(() => AppState.attendees),
      async remove() {
        try {
          if (await Pop.confirm()) {
            await eventsService.remove()
            // router.push({name: 'Events'})
          }
        } catch (error) {
          logger.error(error);
        }
      },
      async createAttendee() {
        const userId = AppState.account.id
        const eventId = route.params.id
        try {
          await attendeesService.createAttendee(userId, eventId)
        } catch (error) {
          logger.error(error);
        }
      },
      async removeAttendee() {

        const attendeeId = this.attendee.id
        try {
          await attendeesService.removeAttendee(attendeeId)
        } catch (error) {
          logger.error(error);
        }
      }
    }
  }
}
</script>

<style>
</style>