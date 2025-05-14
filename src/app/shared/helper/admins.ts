export interface Admins {
  id: number
  createDateTime: string
  createdBy: any
  lastChangedDateTime: string
  lastChangedBy: any
  name: string
  password: string
  email: string
  access_token: any
  login_code: any
  last_login: any
  role: string
  isActive: boolean
  governorates: Governorate[]
  assignPharmacies: AssignPharmacy[]
}

export interface Governorate {
  id: number
  createDateTime: string
  createdBy: any
  lastChangedDateTime: string
  lastChangedBy: any
  name_en: string
  name_ar: string
  is_active: boolean
}

export interface AssignPharmacy {
  id: number
  createDateTime: string
  createdBy: any
  lastChangedDateTime: string
  lastChangedBy?: string
  pharmacy_type: string
  status: string
  pharmacy_name: string
  sign_name: string
  address: string
  license_number: string
  license_issue_date: string
  license_doc: string
  tax_card_doc: string
  commercial_reg_doc: string
  commercial_reg_number: string
  authority_branch: string
  ministry_approval_doc: string
  contract_start_date: string
  gln: string
  essaf24_identifier: any
  supporting_doc: string
  dispensing_doc?: string
  has_dispense_letter: boolean
  need_first_time_entry: boolean
  reviewerComment: any
  finalReviewerComment: any
}
