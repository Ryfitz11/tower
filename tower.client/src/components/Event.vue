<template>
  <div class="card selectable">
    <router-link :to="{ name: 'EventDetails', params: { id: towerEvent.id } }">
      <div class="card-text text-center">
        <img classs="" :src="towerEvent.coverImg" alt="" />
        <h3>{{ towerEvent.name }}</h3>
        <h6>{{ towerEvent.location }}</h6>
        <h6>{{ towerEvent.startDate?.split("T")[0] }}</h6>
      </div>
    </router-link>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger";
import { eventsService } from "../services/EventsService";
import { useRoute } from "vue-router";

export default {
  props: {
    towerEvent: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
    }
  }
}
</script>

<style scoped>
img {
  height: 100px;
}
</style>