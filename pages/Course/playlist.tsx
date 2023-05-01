import React from 'react';
import Image from 'next/image';
import { Course } from '../../typings';
import { sanityClient, urlFor } from '../../sanity';

interface Props {
  course: Course;
}

const Playlist: React.FC<Props> = ({ course }) => {
  console.log('playlist ', course);
  return (
    <div>
      <h1 className='md:text-2xl text-xl my-5 font-bold'>Bento Matte 3D Illustration</h1>
      {Array.isArray(course.videos) && course.videos.length > 0 ? (
        course.videos.map((video) => {
          const { _id, title, class: classNumber, mainImage, slug, price } = video;
          return (
            <div className='overflow-auto md:h-2/4' key={_id}>
              <div className='md:p-3 p-1 hover:bg-[#161616] rounded-xl'>
                <div className='flex space-x-3'>
                  <Image src={urlFor(mainImage).url()} alt='Thumbnail' width={130} height={80} className='rounded-xl md:h-24 h-20' />
                  <div className='w-80'>
                    <h1 className='font-semibold'>{title.slice(0, 45)}...</h1>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default Playlist;
