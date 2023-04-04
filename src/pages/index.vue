<script setup>
  defineOptions({
    name: 'IndexPage',
  })

  const router = useRouter()

  const goToPay = () => {
  router.push(`/pay?plan_id=${encodeURIComponent(selectedPlan.value.id)}`);
  };

    const payStore = paymentStore();

onBeforeMount(() => {
      payStore.userDetails = {};
      payStore.fetchPlans();
    });

    //plans
    const plans = ref([]);
    const selectedPlan = ref([]);

    watchEffect(() => {
      plans.value = payStore.plans;
    });

    const selectPlan = (plan) => {
      if (selectedPlan.value.id === plan.id) {
        selectedPlan.value = [];
      } else {
        selectedPlan.value = plan;
      }
      //save to store
      payStore.selectedPlan = selectedPlan.value;

      goToPay();
    };

     const selectPlanHandler = (plan) => {
      selectPlan(plan);
    };

    const searchPlan = (e) => {
      const search = e.target.value;
      if (search) {
        const filteredPlans = payStore.plans.filter((plan) => {
          return plan.name.toLowerCase().includes(search.toLowerCase());
        });
        plans.value = filteredPlans;
      } else {
        plans.value = payStore.plans;
      }
    };
</script>


<template>
  <div class="container-fluid dark:bg-dark-900">
    <div class="row">
      <aside class="pt-0 col-lg-4 d-lg-block bg-light sidebar collapse">
        <TheSidebar />
      </aside>

      <main class="relative ms-sm-auto col-lg-8 px-0">
        <!-- Topbar -->
        <div class="d-lg-none">
          <TheTopbar />
        </div>

        <div class="main-content px-3">
          <h1 class="title mt-5">Select Savings Group</h1>

          <div class="search-container">
            <div class="input-box dark:bg-dark-500">
              <i class="uil uil-search"></i>
              <input
                type="text"
                placeholder="Search here..."
                @keyup="searchPlan($event)"
              />
              <button class="button">Search</button>
            </div>
          </div>

          <div class="bg-gray-100 dark:bg-dark-500 px-2 py-1 rounded mt-5">
          <div class="scrolling-box px-0">
            <div class="container-fluid">
              <!-- loop through plans and display in small cards -->
              <div class="row">
                <div
                  class="col-lg-3 dark:bg-dark-500 h-auto my-2 p-0 bg-none"
                  v-for="plan in plans"
                  :key="plan.id"
                  @click="selectPlanHandler(plan)"
                >
                  <div class="box dark:bg-dark-900 px-2 mx-1 py-3 rounded">
                    <div
                      v-if="selectedPlan.id !== plan.id"
                      class="float-right dot bg-gray-300"
                    ></div>
                    <div
                      v-if="selectedPlan.id === plan.id"
                      class="float-right dot bg-blue-500"
                    ></div>
                    <p class="badge mt-5">{{ plan.plan_model.name }}</p>
                    <p class="plan_name">{{ plan.name }}</p>
                    <!-- <p class="plan_description">{{ plan.description }}</p> -->
                  </div>
                </div>
              </div>
              <!-- Empty plans -->
              <div v-if="!plans.length" class="row">
                <div class="col-lg-12 h-auto my-2 p-0 bg-none">
                  <div class="box-not-found dark:bg-dark-900 px-3 mx-2 py-3 rounded">
                    <p class="plan_name">Oops! No plans found</p>
                  </div>
                </div>
                </div>
            </div>
          </div>
          </div>
        </div>

         <div class="fixed bottom-0 right-0 mt-5 mr-3">
          <FloatinButton />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}
.scrolling-box {
  margin-top: 3%;
  max-height: 60vh;
  padding-bottom: 100px !important;
  display: block !important;
  overflow-y: scroll !important;
}

.scrolling-box::-webkit-scrollbar {
  width: 0.2em;
}

.scrolling-box::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.scrolling-box::-webkit-scrollbar-thumb {
  background-color: #c08b12;
  outline: 1px solid #707070;
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.title {
  font-size: 22px !important;
  color: #c08b12 !important;
  font-weight: bold !important;
  text-align: left !important;
}

.dot {
  margin-top: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.box, .box-not-found {
  height: 100%;
  background-color: #ffffff;
  cursor: pointer;
  box-shadow: 0 2px 9px rgba(0, 0, 0, 0.1);
}

/* animate om hover */
.box:hover {
  transform: scale(1.03);
  transition: all 0.3s ease-in-out;
}

.plan_name {
  font-size: 14px !important;
  font-weight: 600 !important;
  margin-top: 10px !important;
}

.plan_description {
  font-size: 12px !important;
  font-weight: 400 !important;
  color: rgba(0, 0, 0, 0.7) !important;
  margin-top: 10px !important;
}

.badge {
  font-size: 10px !important;
  background-color: #c08c12a3 !important;
  border: 1px solid #fff !important;
  padding: 5px !important;
  border-radius: 5px !important;
  color: #ffffff !important;
}
.search-container {
  max-width: 100vw;
  height: 50px;
}

.input-box {
  width: inherit;
  height: inherit;
  position: relative;
  background: #ffffff;
  margin-top: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.input-box i,
.input-box .button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.input-box i {
  left: 20px;
  font-size: 17px;
  color: #707070;
}
.input-box input {
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 14px;
  font-weight: 400;
  border: none;
  padding: 0 155px 0 65px;
  background-color: transparent;
}
.input-box .button {
  right: 15px;
  font-size: 13px;
  font-weight: 400;
  color: #fff;
  border: none;
  padding: 12px 30px;
  border-radius: 10px;
  background-color: #4070f4;
  cursor: pointer;
}

.btn-proceed {
  font-size: 13px;
  font-weight: 400;
  color: #fff;
  border: none;
  padding: 12px 30px;
  border-radius: 10px;
  background-color: #4070f4;
  cursor: pointer;
}

.input-box .button:active {
  transform: translateY(-50%) scale(0.98);
}

/* Responsive */
@media screen and (max-width: 500px) {
  .input-box {
    height: 60px;
  }
  .input-box i {
    left: 12px;
    font-size: 25px;
  }
  .input-box input {
    padding: 0 112px 0 50px;
  }
  .input-box .button {
    right: 12px;
    font-size: 14px;
    padding: 8px 18px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: standard
</route>
