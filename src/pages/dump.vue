<template>
  <div>
    <paystack
      buttonClass="'button-class btn btn-primary'"
      buttonText="Pay Online"
      :publicKey="publicKey"
      :email="email"
      :amount="amount"
      :metadata="metadata"
      :reference="reference"
      :onSuccess="onSuccessfulPayment"
      :onCancel="onCancelledPayment"
    ></paystack>
  </div>
</template>
 <script>
import paystack from "vue3-paystack";
import { nanoid } from "nanoid";

export default {
  components: {
    paystack,
  },
  data() {
    return {
      publicKey: "pk_live_ec97fcc0fdbe9ad68108351d00153e4ff84ed018",
      amount: 1000,
      email: "omosholaabolarin@gmail.com",
      metadata: {
        medium: "web",
        firstname: "John",
        lastname: "Doe",
        plan_id: 5,
      },
    };
  },
  // computed
  computed: {
    reference: function () {
      return nanoid(15);
    },
  },
  // methods
  methods: {
    onSuccessfulPayment: function (response) {
      console.log(response);
    },
    onCancelledPayment: function () {
      console.log("Payment cancelled by user");
    },
  },
};
</script>
