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
    events: [
      {
        id: 5928101,
        user: {
          id: 'abc123',
          name: 'Adam'
        },
        category: 'animal welfare',
        organizer: 'Adam',
        title: 'Cat Cabaret',
        description: 'Yay felines!',
        location: 'Meow Town',
        date: '2019-01-03T21:54:00.000Z',
        time: '2:00',
        attendees: []
      },
      {
        id: 8419988,
        user: {
          id: 'abc123',
          name: 'Adam'
        },
        category: 'animal welfare',
        organizer: 'Adam',
        title: 'Kitty Cluster',
        description: 'Yay cats!',
        location: 'Catlandia',
        date: '2019-01-31T22:09:00.000Z',
        time: '7:00',
        attendees: []
      },
      {
        id: 4582797,
        user: {
          id: 'abc123',
          name: 'Adam'
        },
        category: 'animal welfare',
        organizer: 'Adam',
        title: 'Puppy Parade',
        description: 'Yay pups!',
        location: 'Puptown ',
        date: '2019-02-02T23:27:00.000Z',
        time: '1:00',
        attendees: []
      }
    ]
  },
  mutations: {
    INCREMENT_COUNT(state, incrementBy) {
      state.count += incrementBy
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
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
