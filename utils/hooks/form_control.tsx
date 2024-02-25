import { ChangeEvent, FormEventHandler, useState } from "react";
import { form_control, form_control_return } from "../type_declaration";

export default function useForm({
  initial,
  onSubmit,
}: form_control): form_control_return {
  const [values, set_values] = useState(initial);

  function HandleChange(e: ChangeEvent<HTMLInputElement>) {
    set_values((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function HandleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    return onSubmit(values);
  }

  return { ...values, HandleChange, HandleSubmit };
}
