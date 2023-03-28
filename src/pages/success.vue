<script setup>
  defineOptions({
    name: 'SuccessPage',
  })

  const router = useRouter();

  const payStore = paymentStore();

  const { ref_id } = router.currentRoute.value.query;

  //date
  const date = ref(new Date());

  onBeforeMount(() => {
    if (!payStore.userDetails.amount) {
      router.push(`/`);
    }
  });

</script>


<template>
  <div class="container-fluid p-0 dark:bg-dark-900">
      <main class="mx-auto relative ms-sm-auto col-lg-12 px-0">
        <div class="py-4 flex flex-col">
          <div class="mx-auto">
            <img class="img-fluid" src="public/logo.png" width="150" height="150" />
          </div>
        </div>

        <div class="container-fluid flex flex-col">
          <div class="box mt-5 mx-auto p-4">
            <div class="">
              <img class="img-fluid mx-auto" src="public/checkmark_sucess.gif" width="100" height="100" />
              <h1 class="text-2xl text-center my-4 font-bold">Payment Successful</h1>
              <p>Hi {{ payStore.userDetails.firstname }}, </p>
              <p class="mt-3">Your transaction was successful. </p>

              <p class="mt-4 font-bold mb-2">Payment Details:</p>
              <p class="mt-1">Amount: {{ payStore.userDetails.amount.toLocaleString('en-US', { style: 'currency', currency: 'NGN' }) }}</p>
              <p class="mt-1">Savings group: {{ payStore.plan.name }}</p>

              <hr class="my-4">
              <p class="text-center font-bold">Transaction reference: {{ ref_id }}</p>
              <p class="text-center date my-2">Order date: {{ date }}</p>

              <p class="text-center my-4 font-bold">
              <router-link to="/" class="btn" >GO HOME</router-link>
              </p>
            </div>
          </div>
        </div>

      </main>
  </div>
</template>

<style scoped>
.box{
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  max-width: 450px;
}

p{
  font-size:14px;
}

.date{
  font-size: 12px !important;
}
</style>

<route lang="yaml">
meta:
  layout: standard
</route>
