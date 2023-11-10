'use client';
import { useState, FormEvent } from 'react';
import axios from 'axios';
import './page.scss';

const backendUrl = 'http://localhost:7000/api/scrape';

const Home = () => {
  const [url, setUrl] = useState('');

  const urlSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl, { url });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className='hero'>
        <h1>AxeTool</h1>
        <p>The accessibility toolkit handler</p>
      </div>
      <form onSubmit={urlSubmitHandler}>
        <input
          type='text'
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Enter site url...'
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  );
};

export default Home;
