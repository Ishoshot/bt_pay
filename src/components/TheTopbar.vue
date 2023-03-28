<script setup lang="ts">
</script>

<template>
  <aside class="w-auto" aria-label="Sidebar">
    <div class="py-4 bg-gray-100 dark:bg-dark-900 flex flex-col">
      <div class="mx-auto">
        <img class="img-fluid" src="public/logo.png" width="150" height="150" />
      </div>
      <div class="d-none d-md-block">
      <h1 class="page-title text-2xl px-3 my-4 text-center">Complete your payment in three simple steps</h1>
      <div class="stepper d-flex flex-md-row flex-column mt-3 mx-auto px-3">
        <div class="d-flex mb-1">
          <div class="d-flex flex-column pr-4 align-items-center">
            <div class="rounded-circle py-2 px-3 text-white mb-1">1</div>
          </div>
          <div>
            <h2 class="title pt-2">Provide Your Informations</h2>
            <p class="lead">
              Choose your website name & create repository
            </p>
          </div>
        </div>
        <div class="d-flex mb-1">
          <div class="d-flex flex-column pr-4 align-items-center">
            <div class="rounded-circle py-2 px-3 text-white mb-1">2</div>
          </div>
          <div>
            <h2 class="title pt-2">Provide Your Informations</h2>
            <p class="lead">
              Choose your website name & create repository
            </p>
          </div>
        </div>
        <div class="d-flex mb-1">
          <div class="d-flex flex-column pr-4 align-items-center">
            <div class="rounded-circle py-2 px-3 text-white mb-1">3</div>
          </div>
          <div>
            <h2 class="title pt-2">We Process Your Payment</h2>
            <p class="lead">
              Choose your website name & create repository
            </p>
          </div>
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
    -8px -8px 16px 0 rgba(255, 255, 255, 0.55) !important;
}

.stepper .lead {
  font-size: 14px !important;
}

.stepper .title {
  font-size: 17px !important;
}
.bt-pb-10 {
  padding-bottom: 5rem;
}
</style>
