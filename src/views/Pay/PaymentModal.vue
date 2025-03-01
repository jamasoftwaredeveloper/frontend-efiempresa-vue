<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal">
            <h2>Información de Pago</h2>

            <!-- Navegación por pestañas -->
            <div class="tabs">
                <button :class="{ active: activeTab === 'personal' }" @click="activeTab = 'personal'">
                    Datos Personales
                </button>
                <button :class="{ active: activeTab === 'card' }" @click="handleTabChange">
                    Datos de la Tarjeta
                </button>
            </div>

            <form @submit.prevent="handleSubmit" class="modal-form">
                <!-- Contenido de pestañas -->
                <div class="tab-content" v-if="activeTab === 'personal'">
                    <p class="error">{{ messaje }}</p>
                    <div v-for="(label, key) in personalFields" :key="key" class="form-group">
                        <label :for="key">{{ label }}:</label>
                        <input v-if="key !== 'doc_type' && key !== 'currency'" :id="key" v-model="form[key]" type="text"
                            required :disabled="key === 'account'" />
                        <select v-else :id="key" v-model="form[key]" required>
                            <option v-for="option in options[key]" :key="option" :value="option">{{ option }}</option>
                        </select>
                    </div>
                </div>

                <div class="tab-content" v-if="activeTab === 'card'">
                    <div v-for="(label, key) in cardFields" :key="key" class="form-group">
                        <label :for="key">{{ label }}:</label>
                        <input :id="key" v-model="card[key]" type="text" required />
                    </div>
                </div>

                <div class="modal-actions">
                    <button type="button" @click="closeModal">Cancelar</button>
                    <button type="submit" v-if="activeTab === 'card'">Enviar Pago</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { onMounted } from "vue";
import { useCartStore } from "../../store/cart";
import Swal from "sweetalert2";

const props = defineProps({
    visible: { type: Boolean, default: false },
    total: { type: Boolean, default: false }
});
const cartStore = useCartStore();
onMounted(async () => {
    await cartStore.fetchCart(); // 🔹 Llamar fetchCart() en lugar de getCart()
    form.value.account = cartStore.cart.total;
});

const emit = defineEmits(["close", "submitPayment"]);

const activeTab = ref("personal");
const messaje = ref("");
const personalFields = {
    doc_type: "Tipo de Documento",
    doc_number: "Número de Documento",
    name: "Nombre",
    last_name: "Apellido",
    email: "Correo",
    city: "Ciudad",
    address: "Dirección",
    phone: "Teléfono",
    cell_phone: "Celular",
    account: "Valor",
};

const options = {
    doc_type: ["CC", "CE", "TI", "NIT"],
};

const form = ref(Object.fromEntries(Object.keys(personalFields).map(key => [key, ""])));

form.value.account = props.total

const cardFields = {
    number: "Número de Tarjeta",
    exp_month: "Mes de Expiración",
    exp_year: "Año de Expiración",
    cvc: "CVC"
};

const card = ref(Object.fromEntries(Object.keys(cardFields).map(key => [key, ""])));
card.value.number = import.meta.env.VITE_NUMBER_TARJET ?? "4575623182290326";
card.value.exp_month = import.meta.env.VITE_EXT_MONTH_TARJET ?? "12";
card.value.exp_year = import.meta.env.VITE_EXT_YEAR_TARJET ?? "2025";
card.value.cvc = import.meta.env.VITE_EXT_CVC_TARJET ?? "123"

const validatePersonalData = () => {
    return Object.keys(form.value).every(key => form.value[key] !== "");
};

const handleTabChange = () => {
    if (validatePersonalData()) {
        activeTab.value = "card";
    } else {
        messaje.value = "Debes diligenciar primeros los campos personales para poder continuar."
    }
};

const handleSubmit = () => {
    emit("submitPayment", { ...form.value, ...card.value });
};

const closeModal = () => {
    emit("close");
};
</script>


<style src="./PaymentModal.style.css" scoped></style>