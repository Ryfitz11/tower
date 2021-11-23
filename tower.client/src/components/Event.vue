<template>
  <div class="card selectable">
    <router-link :to="{ name: 'EventDetails', params: { id: towerEvent.id } }">
      <div class="card-text">
        <h3>{{ towerEvent.name }}</h3>
        <h6>{{ towerEvent.location }}</h6>
        <!-- <h6>{{ towerEvent.startDate }}</h6> -->
      </div>
    </router-link>
  </div>
</template>

<script>

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

<style>
</style>