import { Button, Divider, Input, Modal, Row, Text } from "@nextui-org/react";
import { updateProfile } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from 'react';
import { User, Image2 } from "react-iconly";
import { app, auth, firestore } from '../config/firebase';
import { sanityClient } from '../sanity';
import { Course } from '../typings';
import Banner from './Banner';
import Card from './Card';
import EbookCard from './EbookCard';
import Headline from './Headline';

interface Props {
  courses: Course[];
}

export default function Home({ courses }: Props): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const storage = getStorage(app);

  const closeHandler = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
    const user = auth.currentUser!;
    const userRef = doc(collection(firestore, "users"), user.uid);

    try {
      const document = await getDoc(userRef);

      if (document.exists()) {
        await updateDoc(userRef, {
          displayName: name,
          photoUrl: photoUrl,
        });

        console.log(name === "" ? "No name" : user.displayName);
        console.log("User profile updated successfully!");
        setShowModal(false);
      } else {
        console.error("User does not exist");
      }
    } catch (error) {
      console.error("Error updating user profile: ", error);
    }
  };

  const handleAvatarChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(
      storage,
      `users/${auth.currentUser?.uid}/avatar/${file.name}`
    );

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      console.log(url);

      setPhotoUrl(url);
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName: name,
          photoURL: url,
        });
      }
    } catch (error) {
      console.error("Error getting download URL: ", error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user && !auth.currentUser?.displayName) {
          setShowModal(true);
        }
      });
      setIsLoading(false);
      return unsubscribe;
    }, 2000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <main className='overflow-hidden'>
      <div className='hidden md:block'>
        <Banner />
      </div>
      <div className='md:my-5 flex flex-col'>
        <Headline Title="Courses" />
        <Card courses={courses} />
        <Headline Title="E-Books" />
        <EbookCard />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Modal closeButton blur aria-labelledby="modal" css={{ background: '#16181A', color: 'white' }} open={showModal} onClose={closeHandler} key="signin-modal" >
          <Modal.Header>
            <h3 className="text-white text-xl">Complete Your <span className="font-bold text-white text-2xl">Profile</span></h3>
          </Modal.Header>
          <Modal.Body>
            <div className="flex file-input p-0 bg-[rgb(22,24,26)] file-input-bordered">
              <div className='flex items-center pl-2'>
                <User set="broken" primaryColor="white" size={18} />
              </div>
              <div className='w-full'>
                <input type="text" placeholder="Type here" className="input px-2 ml-4 bg-[rgb(22,24,26)] w-full " onChange={(e) => setName(e.target.value)} value={name} />
              </div>
            </div>
            <div className="flex file-input p-0 bg-[rgb(22,24,26)] file-input-bordered">
              <div className='flex items-center pl-2'>
                <Image2 set="bold" primaryColor="white" size={18} />
              </div>
              <div className='w-full'>
                <input type="file" className="file-input px-2 ml-4 file-input-ghost bg-[#16181A] border-none w-full" onChange={handleAvatarChange} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Close
            </Button>
            <Button auto onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
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
