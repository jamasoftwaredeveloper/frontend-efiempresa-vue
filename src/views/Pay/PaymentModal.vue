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
                            required :disabled="key === 'value'" />
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
card.value.number = "4575623182290326";
card.value.exp_month = "12";
card.value.exp_year = "2025";
card.value.cvc = "123"

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


<style scoped>
.error{
color: red;
}
/* Estilos generales para el modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.modal {
    background: #fff;
    padding: 20px;
    width: 100%;
    max-width: 700px;
    max-height: 80vh;
    /* Limita la altura del modal */
    overflow-y: auto;
    /* Habilita el scroll cuando el contenido es largo */
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
}

/* Asegurar que el contenido de las pestañas se adapte */
.tab-content {
    flex-grow: 1;
    overflow-y: auto;
    max-height: 60vh;
    /* Define un tamaño máximo para el contenido */
    padding-right: 10px;
    /* Evita que el contenido toque el borde */
}


.modal h2 {
    margin-bottom: 20px;
    text-align: center;
    color: #42b983;
}

/* Estilos para las pestañas */
.tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
}

.tabs button {
    padding: 8px 16px;
    border: none;
    background: #eee;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.tabs button.active {
    background: #42b983;
    color: #fff;
}

/* Formulario y grupos */
.modal-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* En pantallas grandes se muestran las secciones lado a lado */
@media (min-width: 768px) {
    .modal-form {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .modal-actions {
        grid-column: span 2;
    }
}



.form-group {
    padding: 5px;
    text-align: left;
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 5px;
    font-weight: 600;
}

.form-group input,
.form-group select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

/* Acciones del modal */
.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.modal-actions button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;
}

.modal-actions button[type="button"] {
    background: #e91e63;
    color: #fff;
}

.modal-actions button[type="button"]:hover {
    background: #d81b60;
}

.modal-actions button[type="submit"] {
    background: #42b983;
    color: #fff;
}

.modal-actions button[type="submit"]:hover {
    background: #36966e;
}
</style>