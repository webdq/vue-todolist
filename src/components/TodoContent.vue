<template>
  <section v-show="isShow" class="main">
    <input v-model="isCheckedAll" class="toggle-all" type="checkbox" />
    <todo-list></todo-list>
    <!-- <router-view name="todo-list"></router-view> -->
  </section>
</template>

<script>
  import TodoList from '@/components/TodoList'

  export default {
    name: 'TodoContent',
    computed: {
      isCheckedAll: {
        get(){
          return this.$store.state.list.length ? this.$store.state.list.every(item => item.checked) : false
        },
        set(newVal){
          this.$store.commit('setCheckedAll',{checked:newVal})
        }
      },
      isShow(){
        return this.$store.state.list.length ? true : false
      }
    },
    components: {
      TodoList
    }
  }
</script>

<style scoped>
  .main {
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
  }
  .toggle-all {
    position: absolute;
    top: -55px;
    left: -12px;
    width: 60px;
    height: 34px;
    text-align: center;
    border: none;
  }
  .toggle-all:before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }
  .toggle-all:checked:before {
    color: #737373;
  }
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    .toggle-all{
      background: none;
    }

    .toggle-all {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
      -webkit-appearance: none;
      appearance: none;
    }
  }
</style>
