import React, { InputHTMLAttributes, useCallback } from "react";
import { tel, cpf,cnpj,ie} from "./mask";
import styles from '../../../styles/Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: "tel" |"cpf" | "cnpj" | "ie";
  prefix?: string;
}

const InputMask: React.FC<InputProps> = ({ mask, prefix, ...props }) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === "cpf") {
        cpf(e);
      }
      if (mask === "tel") {
        tel(e);
      }
      if (mask === "cnpj") {
        cnpj(e);
      }
      if (mask === "ie") {
        ie(e);
      }
    },
    [mask]
  );

  return (
    <>
      <input  className={styles.input} {...props} onKeyUp={handleKeyUp} />
    </>
  );
};

export default InputMask;