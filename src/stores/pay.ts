import { acceptHMRUpdate, defineStore } from 'pinia'
//import chat http-service
import payService  from '../http-service/pay/main';

export const paymentStore = defineStore('payment', () => {

interface Plan {
  id: number
  plan_model_id: number
  user_id: number
  name: string
  balance: string
  category: string
  duration: string
  target_amount: string
  type: any
  amount: any
  schedule: any
  next_pay_date: any
  members_range: string
  description: string
  invite_code: string
  end_date: string
  created_at: string
  updated_at: string
  naira_balance: number
}

  interface UserDetails {
    firstname: string
    lastname: string
    email: string
    amount: number
  }
  /**
   * Hold plans: Array of plan objects
   */
  const plans = ref<Plan[]>([]);

  /**
   * Hold plan: Plan Object
   */
  const plan = ref<Plan>();

  /**
   * Hold seleted plan: Plan Object
   */
  const selectedPlan = ref<Plan>();

  /**
   * Hold User Details: Object
   */
  const userDetails = ref<UserDetails>({
    firstname: '',
    lastname: '',
    email: '',
    amount: 0
  });

  /**
   * Status of link
   * @type {boolean}
   * @default false
   */
  const linkStatus = ref(false);

  /**
   * Set plan
   *
   * @param plan - new plan to set
   */
  function setPlan(plan: Plan) {
    plans.value.push(plan)
  }

  /**
   * Save details to an object
   * @param firstname, lastname, email, amount
   */
  function saveUserDetails(firstname: string, lastname: string, email: string, amount: number) {
    userDetails.value = {
      firstname,
      lastname,
      email,
      amount
    }
  }


  /**
   * Get all plans
   */
  async function fetchPlans() {
    await payService.fetchPlans()
      .then((res) =>
      {
        res.data.plans.forEach((item: Plan) => {
          plans.value.push(item)
        });
      })
      .catch((err) =>
      {
        // console.log(err)
      })
  }


  /**
   * Get plan by id
   */
  async function getPlan(id: number) {
    await payService.getPlan(id)
      .then((res: any) =>
      {
        plan.value = res.data.plan
      })
      .catch((err: any) =>
      {
        // console.log(err)
      })
  }

  /**
   * Check If Link is a valid link
   */
  async function checkLink(link: string) {
    await payService.checkLink(link)
      .then((res: any) =>
      {
        if (res.data.paymentLink.id) {
          linkStatus.value = true
        }
      })
      .catch((err: any) =>
      {
        linkStatus.value = false
        // console.log(err)
      })
  }



  return {
    setPlan,
    fetchPlans,
    checkLink,
    getPlan,
    plans,
    linkStatus,
    selectedPlan,
    plan,
    saveUserDetails,
    userDetails
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(paymentStore, import.meta.hot))
