<template>
  <div>
    <h1>Events Listing</h1>
    <!-- <div>user : {{ user }}</div>
    <div>categories: {{ categories }}</div>
    <div>categories length: {{ catCount }}</div>
    <div>{{ getEvent(8419988) }}</div> -->
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    ></EventCard>
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
    return {
      events: null
    }
  },
  computed: {
    // catLength() {
    //   return this.$store.getters.catLength
    // },
    // getEvent() {
    //   return this.$store.getters.getEventById
    // },
    // ...mapGetters(['catLength', 'getEventById']),
    ...mapGetters({ catCount: 'catLength', getEvent: 'getEventById' }),
    ...mapState(['user', 'categories'])
  },

  // mapState({
  //   userName: state => state.user.name,
  //   categories: state => state.categories
  // })

  created() {
    EventService.getEvents()
      .then(response => {
        // console.log(response.data)
        this.events = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  }
}
</script>
