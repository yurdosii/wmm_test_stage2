"use client"

import Button from '@mui/material/Button';
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      Hello
      <Button variant="contained"> Hello World</Button>
    </main>
  )
}
