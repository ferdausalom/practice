<template>
  <h1
    class="text-center p-8 font-bold text-2xl text-blue-500 border-2 border-b"
  >
    Football (Soccer) API implementation:
  </h1>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-8">
    <div
      v-for="(quran, index) in alquran"
      :key="index"
      class="bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="px-5 pb-5">
        <a>
          <h5
            class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {{ quran.name }}
          </h5>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let alquran = ref([]);

onMounted(() => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "99eea3d431msh8c7c5a4e0e04264p19d490jsn5028a7589bda",
      "X-RapidAPI-Host": "free-football-soccer-videos1.p.rapidapi.com",
    },
  };

  fetch("http://api.alquran.cloud/v1/surah")
    .then((response) => response.json())
    .then((response) => {
      console.log(response.data);
      alquran.value = response.data;
    })
    .catch((err) => console.error(err));
});
</script>
