// src/components/Navbar/Navbar.script.ts

import { useNavbar } from '../../composables/useNavbar'
const { isAuthenticated, handleLogout } = useNavbar()

export { isAuthenticated, handleLogout }
