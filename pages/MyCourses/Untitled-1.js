// {
//     _createdAt: '2023-04-09T12:03:30Z',
//     _id: 'f10159c3-d77f-41b3-911e-887d1073770f',
//     _rev: 'Ir9i49LrbfbrYx8vmfDXcS',
//     _type: 'Courses',
//     _updatedAt: '2023-04-09T12:03:30Z',
//     author: {
//       _ref: 'b41b0505-afe8-4d94-9cee-0decdfa27ec4',
//       _type: 'reference'
//     },
//     body: 'SWAGAT HAI APKA DESCRIPTION MEIN😁\n' +
//       '\n' +
//       'DOWNLOAD NOW JR TUTORIALS APP👇\n' +
//       '\n' +
//       'JR Tutorials App Link : https://play.google.com/store/apps/de...\n' 
// +
//       '\n' +
//       '                    👇 INTRODUCTION 👇\n' +
//       '\n' +
//       'Hi Everyone. \n' +
//       'Welcome to JR Tutorials. \n' +
//       'I am Rahul Jaiswal. \n' +
//       'Like, share and subscribe. \n' +
//       '#jrtutorials \n' +
//       '.\n' +
//       '.\n' +
//       '.\n' +
//       '        SOME IMPORTANT LINKS👇👇\n' +
//       '.\n' +
//       '.\n' +
//       'For Free Notes & Updates Join Our  telegram Channel:-👇👇👇\n' +    
//       'https://t.me/JR_Tutorials\n' +
//       '.\n' +
//       '.\n' +
//       'For Chating follow me on Instagram:-👇👇\n' +
//       'https://instagram.com/rahuljais23?igs...\n' +
//       '.\n' +
//       '.\n' +
//       'Subscribe out JR Talks Channel:-👇👇👇\n' +
//       '  \n' +
//       '\n' +
//       ' / @jrtalks  \n' +
//       '.\n' +
//       '.\n' +
//       'Subscribe our National Study Channel:-👇\n' +
//       '  \n' +
//       '\n' +
//       ' / @jrcollege  \n' +
//       '.\n' +
//       '.\n' +
//       'Subscribe Our Vloging Channel :-👇👇👇\n' +
//       '  \n' +
//       '\n' +
//       ' / @jrvlogs23  \n' +
//       '.\n' +
//       '.\n' +
//       'Subscribe our JR Juniors Channel:-👇👇👇\n' +
//       'https://youtube.com/@JRJuniors-?si=En...\n' +
//       '.\n' +
//       '.\n' +
//       'Subscribe our JR Shorts Channel:-👇👇👇\n' +
//       'https://youtube.com/@JRShorts-?si=EnS...\n' +
//       '\n' +
//       'Sab Channel Ko Subscribe krlena & Mujhe Instagram pe Follow krlena🤚
// \n' +
//       '\n' +
//       'Thank you.',
//     categories: [ [Object] ],
//     class: 9,
//     mainImage: { _type: 'image', asset: [Object] },
//     slug: {
//       _type: 'slug',
//       current: '9th-science-lmr-revision-or-chapter-16-or-heredity-and-variation-or-jr-tutorials'
//     },
//     title: '9th Science LMR Revision | Chapter 16 | Heredity & Variation | 
// JR Tutorials'
//   }


// import groq from 'groq';
// import { GetStaticPaths, GetStaticProps } from 'next';
// import { ParsedUrlQuery } from 'querystring';
// import Image from 'next/image';
// import Playlist from './playlist';
// import { Course } from '../../typings';
// import { sanityClient, urlFor } from '../../sanity';

// // Define the query to fetch the course data by slug
// const courseQuery = groq`
//   *[_type == "Courses" && slug.current == $slug][0] {
//     _id,
//     title,
//     mainImage,
//   }
// `;

// // Define the getStaticPaths function to generate the paths for all courses
// export const getStaticPaths: GetStaticPaths = async () => {
//   const courses = await sanityClient.fetch(groq`
//     *[_type == "Courses"] {
//       slug {
//         current
//       }
//     }
//   `);

//   return {
//     paths: courses.map((course: { slug: { current: any; }; }) => ({ params: { slug: course.slug.current } })),
//     fallback: false,
//   };
// };

// // Define the getStaticProps function to fetch the course data for a specific slug
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { slug } = params as ParsedUrlQuery;
//   const course = await sanityClient.fetch(courseQuery, { slug });
//   console.log("slugbackend :",course)
//   return {
//     props: {
//       course,
//     },
//   };
// };

// // Use the course data in the component
// const CoursePage = ({ course }: { course: Course }) => {
//   // Render the course details and playlist
//   console.log("slug :",course)
//   return (
//     <div className='my-5 flex md:justify-between md:flex-row flex-col md:space-x-5'>
//       <div className='border-b border-[#0e0e0e]'>
//         <span className='text-lg text-white font-bold'>COURSE</span>
//         <div className=' my-5'>
//           <Image src={urlFor(course.mainImage).url()} alt="Thumbnail" width={700} height={400} className="rounded-xl" />
//           <div className='my-3'>
//             <div className="flex space-x-3">
//               <button className='border-b-2 border-gray-600 text-white md:px-2 md:font-medium '>Overview</button>
//               <button className='hover:border-b-2 border-gray-600 text-white md:px-2 md:font-medium '>Downloads</button>
//               <button className='hover:border-b-2 border-gray-600 text-white md:px-2 md:font-medium '>Comments</button>
//               <button className='hover:border-b-2 border-gray-600 text-white md:px-2 md:font-medium '>Announcements</button>
//             </div>
//             <div>
//               <h2 className='my-3 text-2xl font-medium'>{course.title}</h2>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Playlist />
//     </div>
//   );
// };

// export default CoursePage;
