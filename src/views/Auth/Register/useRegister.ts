// src/composables/useRegister.ts
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../store/auth'
import type { RegisterForm } from '../../../types/register'

export function useRegister() {
  const router = useRouter()
  const authStore = useAuthStore()

  const form = reactive<RegisterForm>({
    name: "",
    email: '',
    password: '',
    password_confirmation : ''
  })

  const handleRegister = async (): Promise<void> => {
    if (form.password !== form.password_confirmation) {
      alert('Las contraseñas no coinciden')
      return
    }
    try {
      await authStore.register({ name:form.name, email: form.email, password: form.password, password_confirmation : form.password_confirmation})
      router.push({ name: 'Home' })
    } catch (error) {
      console.error('Error en registro:', error)
    }
  }

  return { form, handleRegister }
}
