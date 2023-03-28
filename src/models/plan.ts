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

export default Plan

