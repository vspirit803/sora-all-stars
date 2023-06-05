<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = withDefaults( defineProps<{
  src: string;
  alt?: string;
  aspectRatio?: number;
}>(), {
  alt: "/vite.svg",
  aspectRatio: 1,
});

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
  <div>
    <div style="position: relative; width: 100%; height: 100%;">
      <v-img
        :src="src"
        :aspect-ratio="aspectRatio"
        cover
      >
        <template #error>
          <img :src="alt" style="width: 100%; height: 100%;">
        </template>
      </v-img>
    </div>
  </div>
</template>
