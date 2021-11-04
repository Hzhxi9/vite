<script setup lang="ts">
import style from './assets/css/message.module.scss';
import HelloWorld from './components/HelloWorld.vue';

// use css modules
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';

import logo from './assets/logo.png';

const $style = computed(() => style);

onMounted(() => {
  const imgEle = document.querySelector('img');
  imgEle!.src = logo
});
</script>

<template>
  <img alt="Vue logo"/>
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
