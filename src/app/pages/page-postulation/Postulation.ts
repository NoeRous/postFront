import { AnnouncementInstitutionPosition } from "../page-announcement-institution-position/announcement-institution-position"
import { Person } from "../page-person/person"

export interface Postulation {
  id:number,
  voucher:string,
  voucher_url:string,
  applicant:object,
  created_at:Date
  announcement_name:string,
  institution_name:string,
  position_type_name:string
  position_name:string,
  postulation_state_name:string,
  current_phase_name:string
  file_proyect_url: string,
  file_proyect_description: string,
  current_phase_description:string
}

export interface PostulationModel {
  id:number
  voucher: string,
  voucher_url: string,
  is_valid: boolean,
  is_payroll: boolean,
  created_at: Date,
  applicant: Applicant,
  announcementInstitutionPosition: AnnouncementInstitutionPosition,
  file_proyect_url: string,
  currentPhase:Phase
}
export interface Position {
  id:number,
  name: string
  t_par_position_type:PositionType
}

export interface Institution {
  id: number,
  name:string,
  departmentname:string
}

export interface PositionType {
  id: number,
  name:string,
}

export interface User {
  sub:number
}


export interface Phase {
  id:number,
  name:string,
  name_action:string,
  icon_action:string,
  date_init:Date,
  date_end:Date,
  date_publication_result: Date,
  is_qualification:boolean,
  description:string



}

export interface Applicant {
  id:number,
  rda_number:number,
  person:Person

}