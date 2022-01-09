// import {PlanSchemaType} from "../models/plan" 
// import {Progress} from "../types/plan"
// // import isDate from "validator/lib/isDate"
// // DEFINING ERROR MESSAGE INTERFACE
// type ErrCodes = 'string'|'required'|'number'|'date'
// type Err = {
//   message: string,
//   code: ErrCodes
// }
// interface ErrorMessage {
//   errors: Err[],
//   item: string
// }
// export default class PlanValidator {
//   errorMessages: ErrorMessage[] = []
//   constructor(data:PlanSchemaType) {
//     for(const i in data) {
//       if(data[i] === ''||data[i]===null){ 
//         this.newError(i as keyof PlanSchemaType,'required')
//       }
//     }  
//   }
//   private newError(i: keyof PlanSchemaType,code: ErrCodes) {
//     this.errorMessages.forEach(err => {
//       if(err.item === i){
//         err.errors.push({
//           message: `${i} is ${code}.`,
//           code
//         })
//       }else {
//         console.log(i)
//         this.errorMessages.push({
//           item: i,
//           errors: [{
//             message: `${i} is ${code}`,
//             code
//           }]
//         })
//       }
//     })
//   }
// }


// const plan = new PlanValidator({
//   category: "",
//   title: "",
//   type: "",
//   description: "",
//   startDate: new Date("2020-12-24"),
//   endDate: new Date("2020-12-30"),
//   dateCreated: new Date(),
//   image: "",
//   status: Progress.IN_PROGRESS,
// } as any);

// if (process.env.NODE_ENV === "development") {
//   console.log(plan.errorMessages);
// }
