export enum PlanTypes {DAILY="daily",MONTHLY="monthly",YEARLY="yearly"}
export enum Progress {IN_PROGRESS='in-progress',FINISHED="finished"}
export interface PlanSchema {
  title:string,
  description: string,
  startDate: {
    date: number,
    month: number,
    year: number
  },
  endDate: {
    date: number,
    month: number,
    year: number
  },
  category: string,
  type: PlanTypes.DAILY | PlanTypes.MONTHLY | PlanTypes.YEARLY
  status: Progress.IN_PROGRESS | Progress.FINISHED,
  image: string,
  dateCreated:Date
}