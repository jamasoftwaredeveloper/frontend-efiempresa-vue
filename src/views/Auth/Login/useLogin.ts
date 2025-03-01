import { reactive } from "vue"
import { useAuthStore } from "../../../store/auth"
import { useRouter } from "vue-router"
import type { LoginCredentials } from "../../../types/login"


export function useLogin() {
    const router = useRouter()
    const authStore = useAuthStore()
  
    const credentials = reactive<LoginCredentials>({
      email: 'jama_developer@outlook.com',
      password: '123456789'
    })
  
    const handleLogin = async (): Promise<void> => {
      try {
        await authStore.login(credentials)
        router.push({ name: 'Home' })
      } catch (error) {
        console.error('Error en login:', error)
      }
    }
  
    return { credentials, handleLogin }
  }