import React, { useState } from 'react'
import Link from 'next/link'
import { Category, ChevronDown, ChevronUp, Discovery, Heart2, Star } from 'react-iconly'

const Headline = (props: { Title: string }) => {
    return (
        <div className='flex items-center justify-between space-x-2'>
            <div className='flex items-center space-x-2'>
                <div className='px-2 h-8 rounded-sm bg-pink-200'></div>
                <Link href={'/Courses'}>
                    <h1 className='md:text-2xl text-xl font-bold my-5 hover:text-[#e4e4e4]'>{props.Title}</h1>
                </Link>
            </div>
            <div className="flex items-center space-x-3">
                <div className='flex flex-row space-x-2 justify-center py-1 px-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 rounded-full'>
                    <div className="md:p-2 p-1.5 bg-pink-200 rounded-full">
                        <Category set="broken" primaryColor="black" />
                    </div>
                    <div className="text-center py-2" >
                        <span className='text-sm md:text-base hover:text-[#e1e1e1] '>New</span>
                    </div>
                </div>
                <div className='flex flex-row space-x-2 justify-center py-1 px-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 rounded-full'>
                    <div className="md:p-2 p-1.5 bg-pink-200 w-11 rounded-full">
                        <Star set="broken" primaryColor="black" />
                    </div>
                    <div className="text-center py-2" >
                        <span className='text-sm md:text-base hover:text-[#e1e1e1] '>Popular</span>
                    </div>
                </div>
                <div className='flex flex-row space-x-2 justify-center py-1 px-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 rounded-full'>
                    <div className="md:p-2 p-1.5 bg-pink-200 rounded-full">
                        <Heart2 set="broken" primaryColor="black" />
                    </div>
                    <div className="text-center py-2" >
                        <span className='text-sm md:text-base hover:text-[#e1e1e1] '>Free</span>
                    </div>
                </div>
                <div className='flex flex-row space-x-2 justify-center py-1 px-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 rounded-full'>
                    <div className="md:p-2 p-1.5 bg-pink-200 rounded-full">
                        <Discovery set="broken" primaryColor="black" />
                    </div>
                    <div className="text-center py-2" >
                        <span className='text-sm md:text-base hover:text-[#e1e1e1] '>Pro</span>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="bg-[#0f0f0f] hover:bg-[#131313] rounded-lg px-4 h-10 space-x-1 my-3 flex items-center">
                        <span className='text-[#c7c7c7] text-base md:text-lg'>Subject</span>
                        <ChevronDown set="light" size={18} />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Headline
