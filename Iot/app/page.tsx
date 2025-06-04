"use client"
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const Home = () => {
  const session = useAuth()
 const handleClick= ()=>{
  redirect("/dashboard")
 }
  return (
    <div className='w-full max-w-6xl mx-auto '>
      <div className="w-full h-11 flex justify-between items-center">
        <h1>Legion Land detection</h1>
      {session? <Button onClick={handleClick}>Dashboard</Button> : <Button>Login</Button>}
      </div>
    
    </div>
  )
}

export default Home