import { ChangeEvent, FormEventHandler } from "react";

export interface form_control{
    initial: {[key:string]: any},
    onSubmit: (params?:{[key:string]:any}) => void 
}
export interface form_control_return {
  [key: string]: any;
  HandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  HandleSubmit: (e:React.SyntheticEvent) => void;
}
