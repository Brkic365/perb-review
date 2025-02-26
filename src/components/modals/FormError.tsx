import React from 'react'
import styles from "@/styles/components/modals/FormError.module.scss"
import { MdErrorOutline } from "react-icons/md";

function FormError({message}: {message: string}) {
  return (
    <section className={styles.formError}>
        <MdErrorOutline />
        <p className={styles.errorText}>{message}</p>
    </section>
  )
}

export default FormError