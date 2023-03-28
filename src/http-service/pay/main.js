import Api from '../index';

export default {
  /* ------------------------------- Fetch User  ----------------------------------- */
  async fetchPlans ()
  {
    return Api.get(`/payment-link/get-plans`)
  },


  async getPlan(planId) {
    return Api.get(`/payment-link/get-plan/${planId}`)
  },

  async checkLink(ref_id) {
    return Api.get(`/payment-link/check-link/${ref_id}`)
  },

  async getMessages ()
  {
    return Api.get(`/messages`)
  },
}
