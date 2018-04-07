import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    addTodoMuta(state,payload){
      state.list.push(payload)
    },
    editTodoMuta(state,payload){
      state.list.find(item => item.id == payload.id).title = payload.title
    },
    removeTodoMuta(state,payload){
      let i = state.list.findIndex(item => item.id === payload.id)
      state.list.splice(i,1)
    },
    setCheckedAll(state,payload){
      state.list.forEach(item => item.checked = payload.checked)
    },
    getDataMuta(state,payload){
      let data = JSON.parse(window.localStorage.getItem('todoList')) || []
      state.list = data
    },
    saveDataMuta(state,payload){
      window.localStorage.setItem('todoList',JSON.stringify(state.list))
    }
  },
  actions: {
    getDataAct(store,params){
      store.commit('getDataMuta')
    },
    saveDataAct(store,params){
      store.commit('saveDataMuta')
    }
  }
})