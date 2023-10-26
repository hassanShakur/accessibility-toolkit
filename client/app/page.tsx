'use client'
import { useState, FormEvent } from 'react';
import axios from 'axios';


const Home = () => {
    const [url, setUrl] = useState('')

    const urlSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        const res = await axios.get('http://127.0.0.1:7000/test')
        const data = res.data;
        console.log(data)
    }

  return (
    <form onSubmit={urlSubmitHandler}>
        <input type="text" onChange={(e)=>setUrl(e.target.value)} placeholder='Enter site url...' />
        <button type='submit'>Submit</button>
    </form>
  )
}

export default Home;

