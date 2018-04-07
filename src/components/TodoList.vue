<template>
  <ul class="todo-list">
    <li
      v-for="item in list"
      :key="item.id"
      :class="{completed: item.checked,editing: editId === item.id}"
    >
      <div class="view">
        <input
          v-model="item.checked"
          class="toggle"
          type="checkbox"
        />
        <label @dblclick="editTodo(item)" >{{item.title}}</label>
        <button @click="removeTodo(item)" class="destroy"></button>
      </div>
      <input
        :ref="item.id"
        v-model="title"
        @keyup.13="editDone(item)"
        @blur="editDone(item)"
        @keyup.esc="editCancel(item)"
        class="edit"
      />
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'TodoList',
    data () {
      return {
        editId: -1,
        title: '',
        beforeTitle: ''
      }
    },
    watch: {
      list: {
        handler(){
          this.$store.dispatch('saveDataAct')
        },
        deep: true
      }
    },
    computed: {
      list(){
        let path = this.$route.path
        if(path === '/' || path === '/all'){
          return this.$store.state.list
        }
        if(path === '/active'){
          return this.$store.state.list.filter(item => !item.checked)
        }
        if(path === '/completed'){
          return this.$store.state.list.filter(item => item.checked)
        }
      }
    },
    methods: {
      editTodo(item){
        this.editId = item.id
        this.title = this.$store.state.list.find(option => option.id === item.id).title
        this.beforeTitle = this.title
        this.$nextTick( () => {
          this.$refs[item.id][0].focus()
        })
      },
      editDone(item){
        if(this.title.trim()){
          this.$store.commit('editTodoMuta',{id: item.id, title: this.title})
        }else{
          this.removeTodo(item)
        }
        this.editId = -1
      },
      editCancel(){
        this.title = this.beforeTitle
        this.editId = -1
      },
      removeTodo(item){
        this.$store.commit('removeTodoMuta',{id: item.id})
      }
    }
  }
</script>

<style scoped>
  .todo-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .todo-list li {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
  }
  .todo-list li:last-child {
    border-bottom: none;
  }
  .todo-list li.editing {
    border-bottom: none;
    padding: 0;
  }
  .todo-list li.editing .edit {
    display: block;
    width: 506px;
    padding: 13px 17px 12px 17px;
    margin: 0 0 0 43px;
  }
  .todo-list li.editing .view {
    display: none;
  }
  .todo-list li .toggle {
    text-align: center;
    width: 40px;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    -webkit-appearance: none;
    appearance: none;
  }
  .todo-list li .toggle:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
  }
  .todo-list li .toggle:checked:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
  }
  .todo-list li label {
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }
  .todo-list li.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }
  .todo-list li .destroy {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
  }
  .todo-list li .destroy:hover {
    color: #af5b5e;
  }
  .todo-list li .destroy:after {
    content: '×';
  }
  .todo-list li:hover .destroy {
    display: block;
  }
  .todo-list li .edit {
    display: none;
  }
  .todo-list li.editing:last-child {
    margin-bottom: -1px;
  }
  .edit {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    .todo-list li .toggle {
      background: none;
    }

    .todo-list li .toggle {
      height: 40px;
    }
  }
</style>
