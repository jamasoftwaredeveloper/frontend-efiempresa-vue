<!-- src/components/Navbar/Navbar.vue -->
<template>
<nav class="navbar">
    <div class="navbar-logo">
      <router-link to="/">{{ VITE_APP_NAME }}</router-link>
    </div>
    <ul class="navbar-menu">
      <li v-if="isAuthenticated"><router-link v-if="isAdmin" to="/products">Productos {{isAdmin}}</router-link></li>
      <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
      <li v-if="!isAuthenticated"><router-link to="/register">Register</router-link></li>
      <li v-if="isAuthenticated">
        <a href="#" @click.prevent="handleLogout">Logout</a>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts" setup>
import { useNavbar } from '../../composables/useNavbar'
const { isAuthenticated, handleLogout, isAdmin } = useNavbar()
const VITE_APP_NAME = import.meta.env.VITE_APP_NAME
</script>
<style src="./Navbar.style.css" scoped></style>
