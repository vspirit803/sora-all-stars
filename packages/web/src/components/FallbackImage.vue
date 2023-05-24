<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = defineProps<{
  src: string;
  alt: string;
}>();

const srcValid = ref(false);

watchEffect(() => {
  srcValid.value = false;

  fetch(props.src).then((res) => {
    if (res.status === 200) {
      srcValid.value = true;
    }
  }, () => void 0);
});

</script>
<template>
  <img :src="srcValid ? src : alt">
</template>
