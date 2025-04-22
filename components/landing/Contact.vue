<template>
  <section class="relative flex justify-center bg-[#F5F5F5] pt-[48px] pb-[28px]">
    <img class="absolute top-0 h-full w-full z-0" src="/assets/img/fondo-contact.png" alt="">
    <div class="relative z-10 w-[1280px] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-[20px] justify-center px-[20px] sm:px-[40px] md:px-[80px] lg:px-[80px]">
      <div class="max-w-[630px]">
        <h2 class="text-left text-[#2872A1] mb-[10px] text-[18px] font-[700]">¡CONTÁCTANOS!</h2>
        <h1 class="text-left text-bluePrimary mb-[18px] text-[40px] sm:text-[40px] md:text-[48px] font-[700] leading-[45px] md:leading-[70px] ">Estamos para <span class="text-[#F6313C]">ayudarte</span></h1>
        <p class="text-[#68686C] text-[16px]">
          Te pediremos algunos datos importantes para que un experto en soluciones te ayude de la manera más acertada.
          Tómate tu tiempo, no tardarás más de dos minutos.
        </p>

        <form @submit.prevent="onSubmit" class="mt-[32px] grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormControl>
                  <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                  <input class="mt-1.5 block w-full px-3 py-2 border border-gray-300 rounded-md" type="text" id="name" v-bind="componentField" placeholder="Nombres" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div>
            <FormField v-slot="{ componentField }" name="lastName">
              <FormItem>
                <FormControl>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">Apellidos</label>
                  <input class="mt-1.5 block w-full px-3 py-2 border border-gray-300 rounded-md" type="text" id="lastName" v-bind="componentField" placeholder="Apellidos" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div>
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormControl>
                  <label for="email" class="block text-sm font-medium text-gray-700">Correo</label>
                  <input class="mt-1.5 block w-full px-3 py-2 border border-gray-300 rounded-md" type="text" id="email" v-bind="componentField" placeholder="Correo" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div>
            <FormField v-slot="{ componentField }" name="phone">
              <FormItem>
                <FormControl>
                  <label for="phone" class="block text-sm font-medium text-gray-700">Telefono</label>
                  <input class="mt-1.5 block w-full px-3 py-2 border border-gray-300 rounded-md" type="tel" id="phone" v-bind="componentField" placeholder="Telefono" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div>
            <FormField v-slot="{ componentField }" name="business">
              <FormItem>
                <FormControl>
                  <label for="business" class="block text-sm font-medium text-gray-700">Empresa</label>
                  <input class="mt-1.5 block w-full px-3 py-2 border border-gray-300 rounded-md" type="text" id="business" v-bind="componentField" placeholder="Empresa" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div>
            <FormField v-slot="{ componentField }" name="role">
              <FormItem>
                <FormControl>
                  <label for="role" class="block text-sm font-medium text-gray-700">Puesto</label>
                  <input class="mt-1.5 block w-full px-3 py-2 border border-gray-300 rounded-md" type="text" id="role" v-bind="componentField" placeholder="Puesto" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="md:col-span-2">
            <FormField v-slot="{ componentField }" name="message">
              <FormItem>
                <FormControl>
                  <label for="message" class="block text-sm font-medium text-gray-700">Mensaje</label>
                  <textarea id="message" placeholder="Mensaje" rows="4"
                    class="mt-1.5 block w-full px-3 py-2 border border-gray-300 rounded-md"  v-bind="componentField" ></textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="md:col-span-2 flex">
            <button
              :class="[
                'w-full',
                'h-[54px]',
                form.meta.value.valid && !isSubmitting
                  ? 'bg-primary text-white'
                  : 'bg-[#f1f5f9] text-[#95aab9]',
                'rounded-btn',
                'gap-8',
                'flex',
                'font-semibold',
                'items-center',
                'justify-center',
                'cursor-pointer',
              ]"
              :disabled="!form.meta.value.valid && !isSubmitting"
              type="submit"
            >
              Enviar datos
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { useLandingAPI } from "~/composables/useLandingAPI.js";

import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod';
import { useToast } from '../ui/toast';
const isSubmitting = ref(false)
const { toast } = useToast();

const contactFormSchema = z.object({
  name: z.string().min(2, 'Debe ingresar un nombre'),
  lastName: z.string().min(2, 'Debe ingresar sus apellidos'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  phone: z.string().min(9, 'El número de teléfono debe tener al menos 9 dígitos'),
  business: z.string().min(2, 'Debe ingresar la empresa'),
  role: z.string().min(2, 'Debe ingresar el puesto'),
  message: z.string().min(2, 'Debe ingresar un mensaje'),
});

type ContactForm = z.infer<typeof contactFormSchema>;

const formSchema = toTypedSchema(contactFormSchema)

 const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    business: '',
    role: '',
    message: '',  
  },
 }) 

 const onSubmit = form.handleSubmit(async (data: ContactForm) => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  try {
   await handleContact(data)
   toast({
      title: "",
      description: "Su solicitud ha sido enviada, en breve contactaremos con usted.",
      variant: "default",
      class: "border-green-500",
    });

  }
  finally {
    isSubmitting.value = false
  }
 })
const handleContact = async (values: any) => {
  try {
    const response = await useLandingAPI<any>("/landing/contact-us", {
      method: 'POST',
      body: values,
    } as any,);

    return response; // Si esperas algo más, ajusta esta lógica.
  } catch (error) {
    throw error;
  }
}
</script>