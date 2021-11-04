<script setup lang="ts">
import style from './assets/css/message.module.css';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue';

// use css modules
import { computed } from '@vue/reactivity';

const $style = computed(() => style);
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <p :class="$style.message">hello</p>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
