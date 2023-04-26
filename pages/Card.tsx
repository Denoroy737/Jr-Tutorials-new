import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from "../sanity";
import { Course } from '../typings';

interface Props {
  courses: Course[];
}

const Card = ({ courses }: Props) => {
  return (
    <div className='flex flex-wrap md:justify-between justify-center'>
      {Array.isArray(courses) && courses.length > 0 ? courses.map((course) => {
        const { _id, title, class: classNumber, mainImage, slug, price } = course;
        return slug && (
          <Link href={`/Course/${encodeURIComponent(slug.current)}`} key={_id}>
            <div className='my-3 md:w-93 hover:bg-[hsl(0,0%,16%)] bg-[#212121] rounded-xl'>
              <Image src={urlFor(mainImage).url()} alt={title} width={310} height={400} className="rounded-t-xl w-full" />
              <div className="p-5 rounded-b-xl">
                <div className='flex space-x-2 items-center'>
                  <p className='text-sm text-slate-300 font-mono'>1hr 30min </p>
                  <p className='text-sm text-slate-300 font-mono'>class {classNumber}</p>
                </div>
                <div className='flex justify-between'>
                  <h2 className='text-xl font-bold'>{title}</h2>
                  <div className='p-1 px-2 rounded-md bg-green-100 text-stone-900 h-8'>
                    <h2 className=' font-bold'>{price === 0 ? "Free" : `$${price}`}</h2>
                  </div>
                </div>
                <p className='text-lg text-gray-300'>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </Link>
        );
      }) : <p>No courses available</p>}
    </div>
  );
};

export default Card;
