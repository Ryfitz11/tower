<template>
  <div class="m-3">
    <div id="createEvent" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create Event</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createEvent">
              <input
                v-model="state.editable.name"
                type="text"
                class="form-control"
                placeholder="Event Name"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
              <div class="modal-footer">
                <button
                  type="submit"
                  @click.prevent="createEvent"
                  class="btn btn-primary"
                  data-bs-target="#createEvent"
                  data-bs-dismiss="modal"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { eventsService } from "../services/EventsService"
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      editable: {}
    })
    return {
      state,
      async createEvent() {
        try {
          await eventsService.createEvent(state.editable)
          state.editable = {}
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, "error")
        }
      }
    }
  }
}
</script>

<style>
</style>