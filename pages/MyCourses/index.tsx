import React from 'react'
import Link from "next/link"
import Card from '../../components/Card'
const page = () => {
  return (
    <div className='md:my-5 flex flex-col'>
      <div className='flex items-center space-x-2'>
        <div className='px-2 h-8 rounded-sm bg-pink-200'></div>
        <Link href={'/Courses'}>
        <h1 className='text-2xl font-bold my-5 hover:text-[#e4e4e4]'>My Courses</h1>
        </Link>
      </div>
      <Card courses={[]} />
    </div>
  )

}

export default page
