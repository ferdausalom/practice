<template>
  <h1
    class="text-center p-8 font-bold text-2xl text-blue-500 border-2 border-b"
  >
    Football (Soccer) API implementation:
  </h1>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-8">
    <div
      v-for="(soccer, index) in soccers"
      :key="index"
      class="bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <img
          class="p-8 w-full rounded-t-lg"
          :src="soccer.thumbnail"
          alt="product image"
        />
      </a>
      <div class="px-5 pb-5">
        <a :href="soccer.url">
          <h5
            class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {{ soccer.title }}
          </h5>
        </a>
        <div class="mt-2.5 mb-5">
          <p><b>Date:</b> 2022</p>
          <p><b>Team:</b> {{ soccer.side1.name }}</p>
          VS
          <p><b>Team:</b> {{ soccer.side2.name }}</p>
        </div>
        <div class="flex items-center justify-between">
          <a
            :href="soccer.url"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Check details</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let soccers = ref([]);

onMounted(() => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "99eea3d431msh8c7c5a4e0e04264p19d490jsn5028a7589bda",
      "X-RapidAPI-Host": "free-football-soccer-videos1.p.rapidapi.com",
    },
  };

  fetch("https://free-football-soccer-videos1.p.rapidapi.com/v1/", options)
    .then((response) => response.json())
    .then((response) => {
      console.log(soccers);
      soccers.value = response;
    })
    .catch((err) => console.error(err));
});
</script>
