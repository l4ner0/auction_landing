<template>
  <footer v-if="showFooter">
    <div class="flex justify-center bg-[#F3F8FC] py-12">
      <div
        class="w-full max-w-[1280px] p-[0px] grid grid-cols-1 md:grid-cols-3 gap-[50px] sm:gap-[50px] md:gap-[100px] lg:gap-[198.3px] px-[20px] sm:px-[40px] md:px-[80px] lg:px-[80px]"
      >
        <div class="max-w-[277px]">
          <div class="mb-[24px]">
            <img src="/assets/img/logo.png" alt="Logo" class="h-12" />
          </div>
          <p class="text-[16px] text-[#68686C] mb-[24px]">
            Redefinimos la experiencia de compra y venta a través de nuestra
            innovadora plataforma de subastas online.
          </p>
          <div class="flex">
            <NuxtLink
              :to="socialMedia.facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                class="border border-bluePrimary h-[44px] w-[44px] rounded-full flex items-center justify-center mr-[8px]"
              >
                <CustomIcons name="facebook-blue" class="h-3/4 w-3/4" />
              </div>
            </NuxtLink>
            <NuxtLink
              :to="socialMedia.tiktok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                class="border border-bluePrimary h-[44px] w-[44px] rounded-full flex items-center justify-center"
              >
                <CustomIcons name="tiktok-blue" class="h-3/4 w-3/4" />
              </div>
            </NuxtLink>
          </div>
        </div>
        <div>
          <h3 class="font-bold text-bluePrimary text-[24px] mb-[24px]">
            ENLACES RÁPIDOS
          </h3>
          <ul class="grid text-sm text-[#68686C] gap-y-[21px]">
            <NuxtLink to="/who-we-are" class="hover:underline"
              >¿Quiénes somos?</NuxtLink
            >
            <NuxtLink to="/auctions" class="hover:underline">Subastas</NuxtLink>
            <NuxtLink to="/#questions" class="hover:underline"
              >Preguntas frecuentes</NuxtLink
            >
            <NuxtLink to="/auctions" class="hover:underline"
              >¿Cómo participar?</NuxtLink
            >
          </ul>
        </div>
        <div class="max-w-[240px]">
          <h3 class="font-bold text-[#141D38] text-[24px] mb-[24px]">
            CONTACTO
          </h3>
          <div class="grid gap-y-[24px]">
            <!-- Dirección Física -->

            <!-- <NuxtLink
              to="https://maps.google.com/?q=Canaval+y+Moreyra+N°+452,+piso+17,+San+Isidro,+Lima,+Peru"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="flex">
                <div
                  class="bg-bluePrimary h-[44px] w-[44px] rounded-full flex items-center justify-center mr-[16px]"
                >
                  <CustomIcons name="location" class="h-3/4 w-3/4 mx-4" />
                </div>
                <p class="flex flex-col text-[14px] font-[400] text-[#68686C]">
                  DIRECCIÓN
                  <span class="text-[18px] text-bluePrimary leading-tight">
                    Canaval y Moreyra N° 452, piso 17, distrito de San Isidro
                  </span>
                </p>
              </div>
            </NuxtLink> -->

            <!-- Correo Electrónico -->
            <NuxtLink
              to="mailto:atencionalcliente@deocasion.pe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="flex">
                <div
                  class="bg-bluePrimary h-[44px] w-[44px] rounded-full flex items-center justify-center mr-[16px]"
                >
                  <CustomIcons name="email" class="h-3/4 w-3/4" />
                </div>
                <p class="flex flex-col text-[14px] font-[400] text-[#68686C]">
                  CORREO<span class="text-[18px] text-bluePrimary"
                    >atencionalcliente@deocasion.pe</span
                  >
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col md:flex-row items-center justify-between px-[20px] md:pl-[80px] md:pr-[51px] leading-[26px] py-[22px] bg-bluePrimary gap-x-[8px] space-x-2"
    >
      <p class="text-[13px] text-left md:text-[16px] text-[#FFFFFF] font-[400]">
        Copyright ©2025 Novaly. Todos los derechos reservados.
      </p>
      <div
        class="text-[13px] text-left md:text-[16px] text-[#FFFFFF] font-[400]"
      >
        <a href="/terms-and-conditions" class="hover:underline">
          Términos y Condiciones
        </a>
        <span class="px-2"> | </span>
        <a href="/privacy-and-policy" class="hover:underline">
          Privacidad y Política
        </a>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
const router = useRouter();
const excludeRoutes = ["/privacy-and-policy", "/terms-and-conditions"];
const showFooter = computed(
  () => !excludeRoutes.includes(router.currentRoute.value.path)
);
const socialMedia = useRuntimeConfig().public.social;
</script>
