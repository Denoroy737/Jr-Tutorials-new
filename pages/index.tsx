import { Button, Divider, Input, Modal, Row, Text } from "@nextui-org/react";
import { updateProfile } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from 'react';
import { User } from "react-iconly";
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
  const [avatar, setAvatar] = useState("");
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
          displayName: name, // update the user's name with the new value from the input field
          photoUrl: photoUrl, // update the user's profile picture with the new URL
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
      // Upload the file to Firebase Storage first
      await uploadBytes(storageRef, file);

      // Get the download URL of the uploaded file
      const url = await getDownloadURL(storageRef);
      console.log(url);

      setPhotoUrl(url); // set the new profile picture URL
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
        if (user) {
          if (!auth.currentUser?.displayName) {
            setShowModal(true);
          }
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
        <Modal closeButton blur aria-labelledby="modal" open={showModal} onClose={closeHandler} key="signin-modal" >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Complete Your
              <Text b size={18}>
                Profile
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Enter your Name" contentLeft={<User set="broken" />} onChange={(e) => setName(e.target.value)} value={name} />
            <Row justify="space-between" align="center">
              <Text size="medium" weight="bold">Select your avatar</Text>
              <label htmlFor="avatar-input" className='flex'>
                <Input bordered type="file" id="avatar-input" style={{ display: 'none' }} onChange={handleAvatarChange} value={avatar} />
                <Divider />
                <div className='flex items-center'>
                  <Button color="primary" className='ml-5' size="sm">
                    Browse
                  </Button>
                </div>
              </label>
            </Row>
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
  console.log(courses)
  return {
    props: {
      courses,
    }
  }
}
