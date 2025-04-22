<template>
  <!-- Encabezado con logo y menú -->
  <header class="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.07)]">
    <div class="flex justify-end px-6 lg:px-[80px] leading-[26px] pt-[14px] pb-[20px] bg-bluePrimary gap-x-[18px]">
      <h4 class="text-sm lg:text-[18px] text-[#FFFFFF] font-[500]">Síguenos:</h4>
      <a :href="socialMedia.facebook" target="_blank" rel="noopener noreferrer">
        <CustomIcons name="facebook" />
      </a>
      <a :href="socialMedia.tiktok" target="_blank" rel="noopener noreferrer">
        <CustomIcons name="tiktok" />
      </a>
      <a :href="socialMedia.instagram" target="_blank" rel="noopener noreferrer">
        <CustomIcons name="instagram" />
      </a>
    </div>
    <div
      class="max-w-[1440px] w-full mx-auto flex justify-center bg-white py-4 h-auto lg:h-[120px] px-[20px] lg:px-[40px] xl:px-[80px]"">
      <div class=" w-full flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <NuxtLink to="/">
          <img src="/assets/img/logo.png" alt="Deocasión" class="h-8 lg:h-10" />
        </NuxtLink>
      </div>
      <!-- Menú para escritorio (oculto en móvil) -->
      <nav class="hidden lg:flex flex-col lg:flex-row ">
        <NuxtLink to="/home"
          class="py-2 lg:py-[6px] px-2 lg:px-[12px] text-[#152A3C] hover:text-bluePrimary text-[12px] xl:text-[14px] font-[600]">
          Inicio</NuxtLink>
        <NuxtLink to="/auctions"
          class="py-2 lg:py-[6px] px-2 lg:px-[12px] text-[#152A3C] hover:text-bluePrimary text-[12px] xl:text-[14px] font-[600]">
          Subastas</NuxtLink>
        <NuxtLink to="/who-we-are/#how-it-works"
          class="py-2 lg:py-[6px] px-2 lg:px-[12px] text-[#152A3C] hover:text-bluePrimary text-[12px] xl:text-[14px] font-[600]">
          Cómo funciona</NuxtLink>
        <NuxtLink to="/who-we-are"
          class="py-2 lg:py-[6px] px-2 lg:px-[12px] text-[#152A3C] hover:text-bluePrimary text-[12px] xl:text-[14px] font-[600]">
          Quiénes Somos</NuxtLink>
        <NuxtLink to="/#contact"
          class="py-2 lg:py-[6px] px-2 lg:px-[12px] text-[#152A3C] hover:text-bluePrimary text-[12px] xl:text-[14px] font-[600]">
          Contacto</NuxtLink>
        <NuxtLink to="/#questions"
          class="py-2 lg:py-[6px] px-2 lg:px-[12px] text-[#152A3C] hover:text-bluePrimary text-[12px] xl:text-[14px] font-[600]">
          Preguntas Frecuentes</NuxtLink>
      </nav>
      <div class="hidden lg:flex space-x-2">
          <Button
            @click="loginURL"
            variant="default" class="text-[12px] xl:text-[16px] font-inter font-[600]">
            INGRESAR
          </Button>
        <Button
          @click="registerURL"
          :disabled="isLoggedIn"
          class="text-[12px] xl:text-[16px] font-[600] bg-white text-primary border border-primary hover:bg-accent">REGÍSTRATE
          YA!</Button>
      </div>
      <button @click="toggleMenu" class="lg:hidden text-[#152A3C] focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-menu-icon">
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
      </button>
    </div>
    </div>
  </header>
  <!-- Sidebar móvil -->
  <div v-if="isMenuOpen" class="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
    <div class="no-scrollbar w-[80%] max-w-[290px] h-full bg-white p-4 shadow-lg">
      <div class="flex items-center mb-4">
        <X @click="toggleMenu" class="w-4 h-4 text-muted-foreground" />
        <h3 class="pl-[100px] font-bold text-lg text-primary">Menú</h3>
      </div>
      <div class="">
        <nav class="flex flex-col space-y-4 pl-[5px]">
          <NuxtLink to="/home" class="text-[#152A3C] hover:text-bluePrimary text-[14px] font-[600]">Inicio</NuxtLink>
          <NuxtLink to="/who-we-are" class="text-[#152A3C] hover:text-bluePrimary text-[14px] font-[600]">Quiénes Somos
          </NuxtLink>
          <NuxtLink to="/auctions" class="text-[#152A3C] hover:text-bluePrimary text-[14px] font-[600]">Subastas
          </NuxtLink>
          <NuxtLink to="#" class="text-[#152A3C] hover:text-bluePrimary text-[14px] font-[600]">Preguntas Frecuentes
          </NuxtLink>
          <NuxtLink to="#" class="text-[#152A3C] hover:text-bluePrimary text-[14px] font-[600]">Contacto</NuxtLink>
        </nav>
        <div class="flex flex-col gap-y-[6px] mt-[16px]">
          <Button  @click="loginURL" variant="default" class="text-[12px] xl:text-[16px] font-inter font-[600]">
            INGRESAR
          </Button>
          <Button :disabled="isLoggedIn" @click="registerURL" external
            class="text-[14px] font-[600] bg-white text-primary border border-primary hover:bg-accent">REGÍSTRATE
            YA!</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next';
  
const { globalDomain} = useRuntimeConfig().public;

const { data } = await useFetch('/api/auth/is-logged-in')

const isLoggedIn = data.value?.isLoggedIn
//const { isLoggedIn} = await petition.json()
const router = useRouter()
const isMenuOpen = ref(false);


const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
  isMenuOpen.value = false;
};

const baseAuditURL = useRuntimeConfig().public.appUrl
const loginURL = () => {
  window.location.href =  `${baseAuditURL}/auth/login`;
}

const registerURL = () => {
  window.location.href =  `${baseAuditURL}/auth/sign-in`;
}

const socialMedia = useRuntimeConfig().public.social;


//  console.log("Endpoint:", typeof endpoint === 'function' ? endpoint() : endpoint);
</script>
