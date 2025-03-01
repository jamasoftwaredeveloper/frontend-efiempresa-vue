// src/composables/useNavbar.ts
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

export function useNavbar() {
  const router = useRouter()
  const authStore = useAuthStore()

  const userRoles = computed(() => authStore.user?.roles || []); // Obtener roles
  const isAuthenticated = computed(() => !!authStore.token)
  const isAdmin = computed(() => userRoles.value.includes("admin"));


  const handleLogout = (): void => {
    authStore.logout()
    router.push({ name: 'Login' })
  }

  return {
    isAuthenticated,
    handleLogout,
    isAdmin
  }
}
