<template>
  <div>
    <h1>Events Listing</h1>
    <!-- <div>user : {{ user }}</div>
    <div>categories: {{ categories }}</div>
    <div>categories length: {{ catCount }}</div>
    <div>{{ getEvent(8419988) }}</div>-->
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }"
        >Prev Page</router-link
      >
      |
    </template>
    <template v-if="eventsTotal > page * 3">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard'
import EventService from '@/services/EventService'
// import Counter from '@/components/Counter'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    EventCard
    // Counter
  },
  data() {
    return {}
  },
  computed: {
    // catLength() {
    //   return this.$store.getters.catLength
    // },
    // getEvent() {
    //   return this.$store.getters.getEventById
    // },
    // ...mapGetters(['catLength', 'getEventById']),
    page() {
      return parseInt(this.$route.query.page) || 1
    },

    ...mapGetters({ catCount: 'catLength', getEvent: 'getEventById' }),
    ...mapState(['user', 'categories', 'events', 'eventsTotal'])
  },

  // mapState({
  //   userName: state => state.user.name,
  //   categories: state => state.categories
  // })

  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: 3,
      page: this.page
    })
  }
}
</script>
