<script setup lang="ts">
</script>

<template>
  <aside class="w-auto" aria-label="Sidebar">
    <div class="px-3 py-4 bg-gray-100 dark:bg-dark-700 h-screen flex flex-col">
      <div class="mx-auto">
        <img class="img-fluid" src="/public/logo.png" width="150" height="150" />
      </div>
      <div class="stepper d-flex flex-column mt-5">
        <h1 class="page-title mb-5">Complete your contribution in three simple steps</h1>
        <div class="d-flex mb-1">
          <div class="d-flex flex-column pr-4 align-items-center">
            <div class="rounded-circle py-2 px-3 text-white mb-1">1</div>
            <div class="line h-100"></div>
          </div>
          <div>
            <h2 class="title pt-2">Select Savings Group</h2>
            <p class="lead bt-pb-10">
              <!-- Choose your website name & create repository -->
            </p>
          </div>
        </div>
        <div class="d-flex mb-1">
          <div class="d-flex flex-column pr-4 align-items-center">
            <div class="rounded-circle py-2 px-3 text-white mb-1">2</div>
            <div class="line h-100"></div>
          </div>
          <div>
            <h2 class="title pt-2">Provide Your Information</h2>
            <p class="lead bt-pb-10">
              <!-- Choose your website name & create repository -->
            </p>
          </div>
        </div>
        <div class="d-flex mb-1">
          <div class="d-flex flex-column pr-4 align-items-center">
            <div class="rounded-circle py-2 px-3 text-white mb-1">3</div>
            <div class="line h-100 d-none"></div>
          </div>
          <div>
            <h2 class="title pt-2">We Process Your Contribution</h2>
            <p class="lead bt-pb-10">
              <!-- Choose your website name & create repository -->
            </p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>



<style scoped>
.rounded-circle {
  background: transparent !important;
  color: #c08b12 !important;
  box-shadow: 6px 6px 14px 0 rgba(0, 0, 0, 0.2),
    -2px -2px 6px 0 rgba(255, 255, 255, 0.55) !important;
}
.stepper .line {
  width: 2px;
  background: lightgrey !important;
  box-shadow: 6px 6px 14px 0 rgba(0, 0, 0, 0.322) !important;
}

.stepper .lead {
  font-size: 14px !important;
}

.stepper .title {
  font-size: 17px !important;
}
.stepper .page-title {
  font-size: 24px !important;
  text-align: center;
}
.bt-pb-10 {
  padding-bottom: 5rem;
}
</style>
