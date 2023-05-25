import React from 'react';
import Image from 'next/image';
import { Course } from '../../typings';
import { sanityClient, urlFor } from '../../sanity';
import Link from 'next/link';

interface Props {
  course: Course;
}

const Playlist: React.FC<Props> = ({ course }) => {
  console.log('playlist ', course);
  return (
    <div>
      <h1 className='md:text-2xl text-xl my-5 font-bold'>Playlist</h1>
      {Array.isArray(course.videos) && course.videos.length > 0 ? (
        course.videos.map((video) => {
          const { _key, title, mainImage, slug, _id, chapter } = video;
          return (
            <Link href={`/Course/${encodeURIComponent(course.slug.current)}/chapter-${encodeURIComponent(chapter)}/lecture-2`} key={_id}>
              <div className='overflow-auto' key={_id}>
                <div className='md:p-3 p-1 hover:bg-[#161616] rounded-xl'>
                  <div className='flex space-x-3'>
                    {mainImage && (
                      <Image src={urlFor(mainImage).url()} alt='Thumbnail' width={130} height={80} className='rounded-xl md:h-24 h-20' />
                    )}
                    <div className='w-80'>
                      <h1 className='font-semibold'>{title}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default Playlist;

