import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import EventService from '@/services/EventService.js'
export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    count: 0,
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    INCREMENT_COUNT(state, incrementBy) {
      state.count += incrementBy
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    updateCount({ state, commit }, incrementBy) {
      if (state.user) {
        commit('INCREMENT_COUNT', incrementBy)
      }
    },
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event.data)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          // console.log(response.data)
          commit('SET_EVENTS', response.data)
          commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
          console.log(response.headers['x-total-count'])
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      }
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  },
  modules: {}
})
