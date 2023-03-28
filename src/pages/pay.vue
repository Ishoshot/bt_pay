<script setup>

//paystack from vue3-paystack
import paystack from "vue3-paystack";
import { nanoid } from "nanoid";

  const payStore = paymentStore();

  const selectedPlan = ref(payStore.selectedPlan);
  const isLinkValid = ref(payStore.linkStatus);

  const router = useRouter();
  const { plan_id } = router.currentRoute.value.query;
  const { ref_id } = router.currentRoute.value.query;

  //reference
  const reference = "BT_PAY_" + nanoid(15);

  //from .env file
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const onSuccessfulPayment = (response) => {
    console.log(response);
    //route to success page
    router.push(`/success?ref_id=${encodeURIComponent(response.reference)}`);
  };

  const onCancelledPayment = () => {
    console.log("Payment cancelled by user");
  };

  //firstname
  const firstName = ref(payStore.userDetails.firstname ?? '');
  const firstNameError = ref('');

  //lastname
  const lastName = ref(payStore.userDetails.lastname?? '');
  const lastNameError = ref('');

  //email
  const email = ref(payStore.userDetails.email ?? '');
  const emailError = ref('');

  //amount
  const amount = ref(payStore.userDetails.amount ?? 0);
  const amountError = ref('');

  const metadata = {
    medium: "web",
    firstname: firstName.value,
    lastname: lastName.value,
    amount: amount.value,
    plan_id: plan_id,
  };


  const validateForm = () => {
    if (firstName.value === '') {
      firstNameError.value = 'First name is required';
    } else if (firstName.value.length > 20) {
      firstNameError.value = 'First name must be less than 20 characters';
    } else if (firstName.value.length < 3) {
      firstNameError.value = 'Last name must be greater than 3 characters';
    }else {
      firstNameError.value = '';
    }

    if (lastName.value === '') {
      lastNameError.value = 'Last name is required';
    } else if (lastName.value.length > 20) {
      lastNameError.value = 'Last name must be less than 20 characters';
    } else if (lastName.value.length < 3) {
      lastNameError.value = 'Last name must be greater than 3 characters';
    } else {
      lastNameError.value = '';
    }

    if (email.value === '') {
      emailError.value = 'E-mail is required';
    } else if (!/.+@.+\..+/.test(email.value)) {
      emailError.value = 'E-mail must be valid';
    } else {
      emailError.value = '';
    }

    if (amount.value === '') {
      amountError.value = 'Amount is required';
    } else if (amount.value.length > 20) {
      amountError.value = 'Amount must be less than 20 characters';
    } else if (isNaN(amount.value)) {
      amountError.value = 'Amount must be a number';
    } else if (amount.value < 10) {
      amountError.value = 'Amount must be greater than 100';
    } else {
      amountError.value = '';
    }
  };


const isFormValid = () => {
    if(firstName.value == '' || firstName.value == undefined){
      return
    } else {
      validateForm();
    if (firstNameError.value === '' && lastNameError.value === '' && emailError.value === '' && amountError.value === '') {
      return true;
    } else {
      return false;
    }
    }
  };

  const submitForm = () => {
    metadata.firstname = firstName.value;
    metadata.lastname = lastName.value;
    email.value = email.value;
    amount.value = amount.value;
    if (isFormValid()) {
      amount.value = parseInt(amount.value);
      payStore.saveUserDetails(firstName.value, lastName.value, email.value, amount.value);
    }
  };

  const calculateServiceCharge = () => {
    metadata.firstname = firstName.value;
    metadata.lastname = lastName.value;
    email.value = email.value;
    amount.value = amount.value;
    let serviceCharge = 0;
    const percentage = 0.015;
    amount.value = parseInt(amount.value);

    if (amount.value < 2500) {
      let total = (amount.value) / (1 - percentage);
      serviceCharge = total - amount.value;
    } else {
      let total = (amount.value + 100) / (1 - percentage);
      serviceCharge = total - amount.value;
    }

    if (serviceCharge > 2000) {
      serviceCharge = 2000;
    }

    //round up to whole number
    serviceCharge = Math.ceil(serviceCharge + 1);

    return serviceCharge;
}

  //if plan_id is undefined, go back
  if (plan_id === undefined) {
    router.push('/');
  }

  //if ref has value, check if link is valid
  if (ref_id) {
    payStore.checkLink(ref_id);
  }

  onBeforeMount(() => {
    payStore.getPlan(plan_id);
    payStore.selectedPlan = payStore.plan;
  });


  watchEffect(() => {
    selectedPlan.value = payStore.plan;
    isLinkValid.value = payStore.linkStatus;
    firstName.value = payStore.userDetails.firstname;
    lastName.value = payStore.userDetails.lastname;
    email.value = payStore.userDetails.email;
    amount.value = payStore.userDetails.amount;
  });

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

        <div class="main-content px-3" v-if="selectedPlan">
          <h1 class="title my-5">2. Provide Payment Information</h1>

          <!-- PAYMENT LINK NOT ACTIVE -->
          <div v-if="!isLinkValid && ref_id" class="alert mb-5 alert-danger alert-dismissible fade show" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            </button>
            <strong>INVALID PAYMENT LINK! </strong> <br/> The link you are trying to use is invalid. Please contact the group admin. However, you can still make a payment to the group. <button class=" btn-link" @click="()=>{isLinkValid = !isLinkValid}">Click here</button>
          </div>

          <!--  -->
          <h1 class="mb-3">Group Information</h1>
          <div class="rounded border p-2 container-fluid">
            <div class="row p-0 m-0 align-items-center">
              <div class="col-12 col-sm-7 d-flex flex-row align-items-center">
                <p class="profile-image bg-gray-500">
                  {{ selectedPlan.name.substring(0, 2).toUpperCase() }}
                </p>
                <div class="d-flex flex-column mx-3">
                  <p class="plan_name">{{ selectedPlan.name }}</p>
                  <p class="plan_description">Invite code: {{ selectedPlan.invite_code }}</p>
                </div>
              </div>
              <!--  -->
              <div class="col-12 col-sm-5 d-flex flex-row align-items-center justify-content-sm-end mt-2 mt-sm-0">
                <div class="d-flex flex-column mx-3">
                  <p class="plan_description">Goal</p>
                  <p class="plan_description">₦{{ selectedPlan.target_amount }}</p>
                </div>
                <div class="d-flex flex-column mx-3">
                  <p class="plan_description">Created</p>
                  <p class="plan_description">{{ selectedPlan.created_at.substring(0, selectedPlan.created_at.indexOf('T')) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!--  -->
          <h1 class="personal-info mt-5">Personal Information</h1>
          <div class="mt-3">
            <form action="POST" @submit.prevent="submitForm">
              <div class="row">

               <div class="form-group col-12 col-md-6 my-2">
                  <label for="firstName" class="my-1">First name</label>
                  <input type="text" v-model="firstName" name="" id="" class="form-control" placeholder="Enter First Name" required @keyup="isFormValid()">
                  <span class="error-msg" v-if="firstNameError">{{ firstNameError }}</span>
                </div>

                <div class="form-group col-12 col-md-6 my-2">
                  <label for="lastName" class="my-1">Last name</label>
                  <input type="text" v-model="lastName" name="" id="" class="form-control" placeholder="Enter Last Name" required @keyup="isFormValid()">
                  <span class="error-msg" v-if="lastNameError">{{ lastNameError }}</span>
                </div>
              </div>

              <!--  -->

              <div class="row">
                <div class="form-group col-12 col-md-6 my-2">
                  <label for="email" class="my-1">Email Address</label>
                  <input type="email" v-model="email" name="" id="" class="form-control" placeholder="Enter Email Address " required @keyup="isFormValid()">
                  <span class="error-msg" v-if="emailError">{{ emailError }}</span>
                </div>

                <div class="form-group col-12 col-md-6 my-2">
                  <label for="amount" class="my-1">Amount</label>
                  <input type="number" v-model="amount" name="" id="" class="form-control" placeholder="Enter an Amount" required @keyup="calculateServiceCharge()">
                  <span class="error-msg" v-if="amountError">{{ amountError }}</span>
                    <ul class="service-msg mt-1 ml-1" v-if="calculateServiceCharge()">
                      <li>Amount -- <b>{{ amount.toLocaleString('en-US', { style: 'currency', currency: 'NGN' }) }}</b></li>
                      <li>Service fee -- <b>{{ calculateServiceCharge().toLocaleString('en-US', { style: 'currency', currency: 'NGN' }) }}</b></li>
                      <li>You will be charged a total of <b> {{ (amount + calculateServiceCharge()).toLocaleString('en-US', { style: 'currency', currency: 'NGN' }) }}</b></li>
                    </ul>
                </div>
              </div>


              <!-- button -->
              <div class="d-flex justify-content-end">
                <paystack
                    buttonClass="button btn-proceed mt-4"
                    :disabled="!isFormValid()"
                    :hidden="!isLinkValid && ref_id"
                    buttonText="Proceed to Payment"
                    :publicKey="publicKey"
                    :email="email"
                    :amount="(amount + calculateServiceCharge()) * 100"
                    :metadata="metadata"
                    :reference="reference"
                    :onSuccess="onSuccessfulPayment"
                    :onCancel="onCancelledPayment"
                  ></paystack>
              </div>
            </form>
          </div>

          <!-- payament is secured -->
          <div class="my-5">
            <p class="text-center text-small">Your payment is secured by end-to-end encryption</p>
          </div>

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

.text-small{
  font-size: 12px;
}

.service-msg{
  font-size: 12px;
  color: #c08b12;
  font-weight: bold;
}

.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 15px;
  color: #fff;
  text-align: center;
  line-height: 50px;
  margin: 5px 0;
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

.plan_name, label {
  font-size: 14px !important;
  font-weight: 600 !important;
}

.plan_description {
  font-size: 12px !important;
  font-weight: 400 !important;
  color: rgba(0, 0, 0, 0.7) !important;
}

.badge {
  font-size: 10px !important;
  background-color: #c08c12a3 !important;
  border: 1px solid #fff !important;
  padding: 5px !important;
  border-radius: 5px !important;
  color: #ffffff !important;
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

.form-control::placeholder {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.7);
}

.form-control:focus {
  box-shadow: none;
  outline: none;
}

.form-control {
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.7);
  font-size: 15px;
  padding:10px;
  margin-top: 3px;
}

.error-msg {
  color: red;
  font-size: 12px;
  font-weight: 400;
  margin-top: 5px;
}

</style>

<route lang="yaml">
meta:
  layout: standard
</route>
