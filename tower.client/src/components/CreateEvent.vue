<template>
  <div class="m-3">
    <div id="createEvent" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark">Create Event</h5>
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
                aria-label="Event Name"
                aria-describedby="Event Name"
              />
              <input
                v-model="state.editable.description"
                type="text"
                class="form-control"
                placeholder="description"
                aria-label="description"
                aria-describedby="description"
              />
              <input
                v-model="state.editable.coverImg"
                type="text"
                class="form-control"
                placeholder="Cover Image (use a link)"
                aria-label="coverImg"
                aria-describedby="coverImg"
              />
              <input
                v-model="state.editable.location"
                type="text"
                class="form-control"
                placeholder="location"
                aria-label="location"
                aria-describedby="location"
              />
              <input
                v-model="state.editable.capacity"
                type="number"
                class="form-control"
                placeholder="capacity"
                aria-label="capacity"
                aria-describedby="capacity"
              />

              <input
                v-model="state.editable.startDate"
                type="Date"
                class="form-control col-6"
                placeholder="startDate"
                aria-label="startDate"
                aria-describedby="startDate"
              />
              <select
                v-model="state.editable.type"
                class="form-select mt-2"
                aria-label="select"
              >
                <!-- <option selected>Choose Sprint...</option> -->
                <option
                  v-for="t in types"
                  :key="t.value"
                  :type="t"
                  class="dropdown-item selectable"
                  v-bind:value="t.value"
                >
                  {{ t.value }}
                </option>
              </select>
              <!-- <div class="input-group mb-3">
                <button
                  class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Type
                </button>
                <ul class="dropdown-menu dropdown-menu-start">
                  <li>
                    <a class="dropdown-item" href="#">Concert</a>
                  </li>
                  <li><a class="dropdown-item" href="#">Convention</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Sport</a>
                  </li>
                  <li><a class="dropdown-item" href="#">Digital</a></li>
                </ul>
              </div> -->
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
import { computed, reactive } from "@vue/reactivity"
import { useRoute, useRouter } from "vue-router"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      editable: {}
    })
    return {
      types: computed(() => AppState.events.types),
      state,
      async createEvent() {
        try {
          await eventsService.createEvent(state.editable)
          state.editable = {}
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, "error")
        }
        router.push({ name: EventDetails })
      }
    }
  }
}
</script>

<style>
</style>