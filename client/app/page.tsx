'use client'
import { useState, FormEvent } from 'react';


const Home = () => {
    const [url, setUrl] = useState('')

    const urlSubmitHandler = (e: FormEvent) => {
        e.preventDefault()
        console.log(url)
    }

  return (
    <form onSubmit={urlSubmitHandler}>
        <input type="text" onChange={(e)=>setUrl(e.target.value)} placeholder='Enter site url...' />
        <button type='submit'>Submit</button>
    </form>
  )
}

export default Home;

