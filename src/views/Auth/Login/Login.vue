<template src="./Login.template.html"></template>
<script setup lang="ts">

import { useLogin } from './useLogin'
const { credentials, handleLogin } = useLogin()

</script>
<style src="./Login.style.css" scoped></style>