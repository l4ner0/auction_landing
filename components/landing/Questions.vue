<template>
  <section class="w-full flex justify-center">
    <div class="max-w-[1280px] w-full">
      <h2
        class="text-center text-bluePrimary mt-[48px] mb-[16px] text-[18px] font-[700]"
      >
        DUDAS
      </h2>
      <h1
        class="text-center text-bluePrimary mb-[32px] text-[32px] sm:text-[40px] md:text-[48px] font-[700]"
      >
        Preguntas <span class="text-[#F6313C]">frecuentes</span>
      </h1>
      <div
        class="max-w-[1440px] grid grid-cols-1 gap-4 mt-[32px] mb-[48px] mx-[20px] sm:mx-[40px] md:mx-[80px] lg:mx-[80px]"
      >
        <div
          v-for="(questions, index) in questions"
          :key="index"
          class="max-w-[1280px] border-b-[1px] border-b-[#E2E8F0] p-4 cursor-pointer"
        >
          <div
            class="flex text-[14px] md:text-[16px] font-[700] justify-between items-center"
            @click="toggle(index)"
          >
            <h3 class="text-[#152A3C] hover:text-[#2872A1]">
              {{ questions.question }}
            </h3>
            <button>
              <span :class="{ 'rotate-180': activeIndex === index }">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#152A3C"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          <p
            v-if="activeIndex === index"
            v-html="questions.answer"
            class="mt-2 text-[#0F172A] text-[14px] font-[400] transition-all"
          ></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface FAQ {
  question: string;
  answer: string;
}

const appUrl: string = useRuntimeConfig().public.appUrl;
type BankAccount = {
  cciNumber: string;
  bank: string;
  accountNumber: string;
};
const { data: bankAccounts } = await useLandingAPI<BankAccount[]>(
  `/finance/disbursement-management/view-all-bank-accounts`,
  {
    default: () => [],
  },
);

const questions = ref<FAQ[]>([
  {
    question: "1. ¿QUÉ SIGNIFICA UNA SUBASTA ONLINE?",
    answer: `

<div class="text-gray-700 space-y-2">
  <p>
    Es tu oportunidad de <span class="font-semibold text-blue-700">comprar y vender bienes</span> desde cualquier lugar.
  </p>
  <p>
    Regístrate, participa como <span class="font-semibold">postor</span> y compite en tiempo real por las mejores ofertas.
  </p>
  <p class="font-bold text-blue-700">¡Gana el bien que deseas con un solo click!</p>
</div>
`,
  },
  {
    question: "2. ¿CÓMO REALIZO UNA RECARGA DE SALDO?",
    answer: `<ol class="pl-5 space-y-2 text-gray-700">
  <li><span class="font-semibold">1.</span> Regístrate y crea tu cuenta.</li>
  <li>
    <span class="font-semibold">2.</span> Deposita a nuestras cuentas corrientes:
    <ul class="mt-2 pl-5 space-y-1 text-blue-700 font-medium">
      ${bankAccounts.value
        .map(
          (account, index) => `
            <li>
              <span class="font-semibold">${index + 1}.</span> 
              ${account.bank} - 
              CCI: ${account.cciNumber}, 
              Cuenta: ${account.accountNumber}
            </li>
          `,
        )
        .join("")}
    </ul>
  </li>
  <li><span class="font-semibold">3.</span> Recibirás un voucher.</li>
  <li>
    <span class="font-semibold">4.</span> Accede a 
    <strong class="text-blue-700">"Monedero Virtual"</strong> y llena la información.
  </li>
  <li><span class="font-semibold">5.</span> Adjunta el comprobante de abono.</li>
  <li>
    <span class="font-semibold">6.</span> Nuestro personal validará y recargará tu saldo automáticamente.
  </li>
</ol>`,
  },
  {
    question: "3. ¿CÓMO PARTICIPO DE UNA SUBASTA?",
    answer: `<ol class=" pl-5 space-y-2 text-gray-700">
  <li>
    <span class="font-semibold">1.</span> Regístrate gratis en nuestra web 
    <a href="${appUrl}/auth/sign-in" target="_blank" class="text-blue-600 hover:underline">Aquí</a> 
    para poder participar de las subastas.
  </li>
  <li>
    <span class="font-semibold">2.</span> Elige la subasta de tu interés, haz una oferta en tiempo real y presiona el botón 
    <strong class="text-blue-700">"Participar en puja"</strong>.
  </li>
  <li>
    <span class="font-semibold">3.</span> Revisa los resultados en 
    <strong class="text-blue-700">"Mis pujas"</strong>.
  </li>
  <li>
    <span class="font-semibold">4.</span> ¡Listo! Si ganaste la subasta, realiza el pago y recibe tu producto.
  </li>
</ol>

<p class="mt-4 p-3 border-l-4 border-blue-500 bg-blue-50 text-gray-700">
  <strong class="text-blue-700">Nota:</strong> Para participar debes contar con saldo en tu monedero virtual. 
  Por cada evento, se debitará un monto como garantía. Si cumples con las condiciones, 
  ese monto se devolverá a tu monedero, ya sea que ganes o no la subasta. 
  Si no cumples, el saldo no será reembolsado.
</p>`,
  },
  {
    question: "4. ¿TIENE ALGÚN COSTO INSCRIBIRME EN LA PLATAFORMA?",
    answer: `<p>
  <strong>¡No!</strong> Registrarte en nuestra plataforma es <strong>100% gratis</strong>. 
  ¡No esperes más y únete hoy mismo! 
  <a href="URL_DEL_REGISTRO" target="_blank">Regístrate aquí</a>.
</p>`,
  },
  {
    question: "5. ¿QUÉ ES EL CÓDIGO DE USUARIO?",
    answer: `<p>
  Es tu identificador único para acceder a la plataforma y explorar todas las ofertas en subasta, 
  mediante un evento que está nombrado como <strong>EVE</strong> y está seguido de un número. 
  Esta referencia te ayudará a encontrar el producto deseado. 
  Al culminar la separación de tu bien adquirido, te llegará un <strong>seudónimo</strong> 
  para garantizar tus datos personales.
</p>`,
  },
  {
    question: "6. ¿LOS IMPORTES DE LAS SUBASTAS INCLUYEN IGV?",
    answer: "No, el IGV se calculará según el precio final del bien subastado.",
  },
]);

const activeIndex = ref<number | null>(null);

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
