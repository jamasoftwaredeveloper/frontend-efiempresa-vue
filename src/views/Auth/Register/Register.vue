<template src="./Register.template.html"></template>
<script setup lang="ts">
import { useRegister } from './useRegister'
const { form, handleRegister } = useRegister()
</script>
<style src="./Register.style.css" scoped></style>