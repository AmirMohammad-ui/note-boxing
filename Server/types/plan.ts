export enum PlanTypes {DAILY="daily",MONTHLY="monthly",YEARLY="yearly"}
export enum Progress {IN_PROGRESS='in-progress',FINISHED="finished"}
export interface File {
  name: string;
  mimetype: string;
  size: number;
  md5: string;
  mv: Function;
}
export interface NewPlan {
  title:string;
  image:string;
  description:string;
  startDate:Date;
  endDate:Date;
  priority:number;
  category:string;
  type:string
}