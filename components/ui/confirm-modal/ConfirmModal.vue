<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ref } from 'vue';
import CustomInput from "@/components/ui/custom-input/CustomInput.vue"; 

const showModal = ref(false);

const handleSubmit = () => {
  console.log("Formulario enviado"); 
};
</script>

<template>
  <button @click="showModal = true" class="btn btn-primary">Ingresar</button>

  <AlertDialog :open="showModal" @update:open="(event) => (showModal = event)" class="z-[30]">
    <AlertDialogContent class="z-[98] max-w-[600px] px-6 py-4">
      <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
        <AlertDialogHeader>
          <img src="/path/to/logo.png" alt="Logo Deocasión" class="w-24 mx-auto mb-4" />
          <AlertDialogTitle class="text-xl font-semibold text-center">Registro</AlertDialogTitle>
          <p class="text-center text-gray-500">Crea tu cuenta y comienza a subastar o pujar.</p>
        </AlertDialogHeader>

        <div class="flex flex-col gap-4">
          <!-- Selección Persona Natural/Jurídica -->
          <label class="flex items-center gap-2">
            <input type="checkbox" class="form-checkbox" /> Persona Natural
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" class="form-checkbox" /> Persona Jurídica
          </label>

          <!-- Campos de registro -->
          <div class="grid grid-cols-2 gap-4">
            <CustomInput label="Nombres" />
            <CustomInput label="Apellidos" />
            <CustomInput label="Tipo de DOI" />
            <CustomInput label="Número de documento" />
            <CustomInput label="Sexo" />
            <CustomInput label="Estado civil" />
            <CustomInput label="Fecha de nacimiento" type="date" />
            <CustomInput label="Número de Celular" />
            <CustomInput label="Correo electrónico" type="email" />
          </div>

          <!-- Consentimiento -->
          <label class="flex items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" class="form-checkbox" />
            He leído, conozco las condiciones para el tratamiento de mis datos personales y doy mi consentimiento, en su caso, tal y como se describe en el Aviso de privacidad y Términos de uso.
          </label>
        </div>

        <AlertDialogFooter class="mt-4">
          <button type="button" class="btn-secondary" @click="showModal = false">Cancelar</button>
          <button type="submit" class="btn-primary">Crear cuenta</button>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style scoped>
.btn {
  padding: 8px 16px;
  font-weight: bold;
}
.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-secondary {
  background-color: #f1f1f1;
  color: #333;
}
</style>
