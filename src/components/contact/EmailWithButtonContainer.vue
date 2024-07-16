<script setup>
  import FullWidthButton from "../FullWidthButton.vue";
</script>

<template>
  <div class="flex flex-col">
    <div
      class="w-full border border-[var(--primary-color)] border-b-0 p-4 flex flex-col"
    >
      <div>
        <p class="paragraph-text">Mail me at:</p>
      </div>
      <div>
        <p class="mail-text">thanasiswd@gmail.com</p>
      </div>
    </div>
    <div>
      <FullWidthButton
        :text="'get in touch'"
        :route="'/contact'"
        :isWhite="false"
      />
    </div>
  </div>
</template>
