<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto py-6">
      <h1 class="font-bold text-4xl text-center text-green-600 mb-8 italic">
        Al Quran
      </h1>
      <div class="bg-white p-4 shadow rounded">
        <div class="flex -mx-4 items-center mb-6">
          <div class="flex-1 px-4">
            <select
              @change="surahNumber"
              name="quran-input"
              id=""
              class="quran-input"
            >
              <option disabled selected value="">Select Sura</option>
              <option
                v-for="surah in alquran"
                :key="surah.id"
                :value="surah.number"
              >
                {{ surah.name }} &nbsp; {{ surah.englishName }}
              </option>
            </select>
          </div>
          <div class="flex-1 px-4 text-center">
            <h3 class="font-bold mb-1 text-2xl text-[#35a79c]">
              {{ surahName.englishName }}
            </h3>
            <p>{{ surahName.englishNameTranslation }}</p>
          </div>
          <div class="flex-1 px-4">
            <select @change="ayahNumber" class="quran-input">
              <option disabled selected value="">Select Ayth</option>

              <option
                v-for="(ayah, index) in ayahs"
                :key="index"
                :value="ayah.numberInSurah"
              >
                {{ ayah.numberInSurah }}
              </option>
            </select>
            <button
              @click="allAyth"
              class="bg-transparent w-full mt-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded"
            >
              All Ayth
            </button>
          </div>
        </div>
        <div class="text-4xl mt-8 text-slate-700 relative min-h-[20rem]">
          <div class="loader" v-if="loading"></div>
          <p
            v-for="(ayah, index) in ayahs"
            :key="index"
            class="mb-8 text-right leading-[3rem]"
          >
            <span
              class="text-xs max-w-min px-[.45rem] py-[.1rem] flex items-center justify-center border-green-200 border-2 rounded-full ml-3 mr-6"
              >{{ ayah.numberInSurah }}
            </span>
            {{ ayah.text }}

            <av-waveform
              :canv-height="0"
              :canv-width="0"
              :src="ayah.audio"
            ></av-waveform>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, onBeforeUnmount } from "vue";

let alquran = ref([]);
let ayahs = ref([]);
let surahName = ref({});
let items = ref([]);
let loading = ref(false);

function surahNumber(e) {
  getSurah(e.currentTarget.value);
}

function ayahNumber(e) {
  items = ayahs.value.filter((item) => {
    if (e.currentTarget.value == item.numberInSurah) {
      return item;
    }
  });

  ayahs.value = items;
}

async function getSurah(surahNum) {
  loading.value = true;
  await axios
    .get("https://api.alquran.cloud/v1/surah/" + surahNum + "/ar.alafasy")
    .then(function (response) {
      // handle success
      ayahs.value = response.data.data.ayahs;
      surahName.value = response.data.data;
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  axios.get("https://api.alquran.cloud/v1/surah").then(function (response) {
    alquran.value = response.data.data;
  });

  getSurah(1);
});
</script>

<style scoped>
.quran-input {
  width: 100%;
  border-radius: 0.25rem;
  border-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity));
  padding: 0.5rem 1rem;
}
.loader {
  /* Loader Div Class */
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-image: url(./assets/Wedges-3s-200px.gif);
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 10000000;
  opacity: 0.8;
  background-color: #182d4b;
  border-radius: 10px;
  filter: alpha(opacity=40);
}
</style>
