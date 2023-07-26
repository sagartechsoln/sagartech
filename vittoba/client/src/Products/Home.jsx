import React from 'react'
import Header from './components/Header'
const Home = () => {

  return (
    <main className=' dark:bg-slate-800 '>
        <div className='w-100 md:container md:mx-auto '>
            <Header />
        </div>
        <img src='https://placehold.co/2090x720?text=Main+Page+Banner' style={{margin: 0, padding: 0}} />
    </main>
  )
}

export default Home