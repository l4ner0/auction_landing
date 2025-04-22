<template>
  <section class="relative h-auto bg-[#eeeeee]">
    <img
      class="absolute top-0 h-full w-full z-0"
      src="/assets/img/fondo-steps.png"
      alt=""
    />
    <div class="relative z-10 grid justify-center pt-[48px] mb-[48px]">
      <div
        class="w-full max-w-[1280px] grid justify-center px-[20px] md:px-[80px]"
      >
        <h2
          class="text-center text-[#2872A1] mb-[10px] text-[16px] lg:text-[18px] font-[700]"
        >
          PASOS A SEGUIR
        </h2>
        <h1
          class="text-center text-bluePrimary text-[32px] md:text-[48px] lg:text-[48px] font-[700] leading-[40px] md:leading-[70px]"
        >
          ¿Cómo participar de
          <span class="text-[#F6313C]">nuestras subastas?</span>
        </h1>
      </div>
    </div>
    <div
      class="container px-[20px] md:px-[80px] pt-8 relative pb-[71px] md:pb-[0px]"
    >
      <img
        src="/assets/img/process_line.png"
        alt="Lineas"
        class="hidden xl:block absolute top-0 left-1/2 transform -translate-x-1/2 w-[76%] h-full z-0 object-contain"
      />
      <div
        class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 justify-items-center gap-[80px] justify-center"
      >
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="relative bg-[#FFFFFF] p-4 rounded-lg shadow-md w-[250px] h-[250px] text-center flex flex-col items-center justify-center mb-[0px] md:mb-[71px]"
        >
          <div
            class="absolute top-[-24px] left-[-12px] md:left-[-24px] w-[66px] h-[66px] rounded-full bg-bluePrimary flex items-center justify-center text-white text-[36px] font-[700]"
          >
            <span>{{ ("0" + (index + 1)).slice(-2) }}</span>
          </div>
          <CustomIcons :name="step.icon" class="mb-4" />
          <h3 class="text-[#20445E] font-[600] text-[24px] mb-[8px]">
            {{ step.title }}
          </h3>
          <p
            class="text-[#68686C] font-[400] font-Roboto text-[14px]"
            v-html="step.description"
          ></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CustomIcons from "@/components/ui/custom-icons/CustomIcons.vue";
const appUrl = useRuntimeConfig().public.appUrl;

const steps = [
  {
    icon: "register",
    title: "Regístrate",
    description: `Regístrate gratis en nuestra web <a href="${appUrl}/auth/sign-in" class="font-[500] text-bluePrimary">(AQUÍ)</a> para poder participar de las subastas`,
  },
  {
    icon: "register",
    title: "Elige",
    description:
      'Elije la subasta de tu interés, haz una oferta en tiempo real y presiona el botón <a href="#" class="font-[500] text-bluePrimary">“Participar en puja"</a>',
  },
  {
    icon: "register",
    title: "Revisa",
    description:
      'Revisa los resultados en <a href="#" class="font-[500] text-bluePrimary">“Mis pujas”</a>',
  },
  {
    icon: "register",
    title: "¡Listo!",
    description:
      'Si ganaste la subasta, realiza el pago y <a href="#" class="font-[500] text-bluePrimary">recibe tu producto</a>',
  },
];
</script>
