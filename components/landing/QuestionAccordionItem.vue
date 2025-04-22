<template>
  <div
    :key="0"
    class="max-w-[1280px] border-b-[1px] border-b-[#E2E8F0] p-4 cursor-pointer"
  >
    <div
      class="flex text-[14px] md:text-[16px] font-[700] justify-between items-center"
      @click="toggle(0)"
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
      class="mt-2 text-[#0F172A] text-[14px] font-[400s] transition-all"
    >
      {{ questions.answer }}
    </p>
  </div>
</template>
