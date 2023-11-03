import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { Course } from '../../typings';
import Playlist from './playlist';
import { sanityClient, urlFor } from '../../sanity';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';

interface Props {
  course: Course;
}

const PostPage = ({ course }: Props) => {
  console.log("course");
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div className='my-5 flex md:justify-between md:flex-row flex-col md:space-x-5'>
      <div className='border-b border-[#0e0e0e]'>
        <span className='text-lg text-white font-bold'>COURSE</span>
        <div className='my-5'>
          {/* <Image src={urlFor(course.mainImage).url()} alt="Thumbnail" width={700} height={400} className="rounded-xl" /> */}
          <Player
            playsInline
            poster={urlFor(course.mainImage).width(900).url()}
            src={`course.videos[0].video.secure_url`} // Accessing the secure_url property of the video object
          />

          <div className='my-3'>
            <div className="flex space-x-3">
              <button className='border-b-2 border-gray-600 text-white md:px-2 md:font-medium '>Overview</button>
              <button className='hover:border-b-2 border-gray-600 text-white md:px-2 md:font-medium '>Downloads</button>
              <button className='hover:border-b-2 border-gray-600 text-white md:px-2 md:font-medium '>Comments</button>
              <button className='hover:border-b-2 border-gray-600 text-white md:px-2 md:font-medium '>Announcements</button>
            </div>
            <div>
              <h2 className='my-3 text-2xl font-medium'>{course.title}</h2>
              <div className='border-t border-[#0e0e0e] py-2'>
                {course.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Playlist course={course} />
    </div>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string

  const query = `*[_type == "Courses" && slug.current == $slug][0]`

  const course = await sanityClient.fetch<Course>(query, { slug })

  return {
    props: { course },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "Courses"]{slug}`
  const courses = await sanityClient.fetch<{ slug: { current: string } }[]>(query)

  const paths = courses.map((course) => ({
    params: { slug: course.slug.current }
  }))

  return {
    paths,
    fallback: true
  }
}
