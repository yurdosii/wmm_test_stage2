"use client"

import Onboarding from "./onboarding";
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Onboarding />
    </main>
  )
}
