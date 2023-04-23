import Banner from './Banner';
import Card from './Card';
import Ebok_card from './ebok_card';
import Headline from './headline';
import React from 'react';
import { sanityClient } from "../sanity";
import { Course } from '../typings';

interface Props {
  courses: Course[];
}

export default function Home({ courses }: Props): JSX.Element {
  return (
    <main className='overflow-hidden'>
      <div className='hidden md:block'>
        <Banner />
      </div>
      <div className='md:my-5 flex flex-col'>
        <Headline Title="Coureses" />
        <Card courses={courses} />
        <Headline Title="E-Books" />
        <Ebok_card />
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {

  const query = `*[_type == "Courses"]`;
  const courses = await sanityClient.fetch<Course[]>(query);
  return {
    props: {
      courses,
    }
  }

}