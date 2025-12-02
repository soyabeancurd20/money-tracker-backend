import { Schema, model } from 'mongoose';
export interface ITransaction { type: 'Income'|'Expense'; category:string; amount:number; date:Date; note?:string; }
const transactionSchema = new Schema<ITransaction>({
  type:{type:String,enum:['Income','Expense'],required:true},
  category:{type:String,required:true},
  amount:{type:Number,required:true},
  date:{type:Date,required:true},
  note:{type:String}
}, { timestamps:true });
export default model<ITransaction>('Transaction', transactionSchema);
