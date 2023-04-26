import React, { useState, useEffect } from "react";
import { Modal, Input, Row, Checkbox, Button, Text, Col } from "@nextui-org/react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from "firebase/auth";
import { auth, firestore } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { Message, Unlock, Call } from "react-iconly";
import type { UserCredential } from "firebase/auth";
import { useRouter } from 'next/router';
import Link from "next/link";



export default function Signup() {
  const [visible, setVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified) {
          // User is logged in and email is verified, navigate to the desired page
          router.push('/');
        } else {
          // User is logged in but email is not verified, show a message to the user.
          console.log("Please verify your email address.");
        }
      }
    });
    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, [router]);


  const handleSignUp = async () => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed up
      const user = userCredential.user;
      console.log("User signed up:", user);

      // Send email verification
      await sendEmailVerification(user);

      // Show message to user to check their email and verify their email address.
      console.log("A verification email has been sent to your email address.");

      await updateProfile(user, {
        displayName: name,
        photoURL: photoUrl,
      });
      console.log("Profile updated successfully!");

      await setDoc(doc(firestore, "users", user.uid), {
        name,
        photoUrl,
        email,
        createdAt: new Date(),
      }, { merge: true });
      console.log("User document updated successfully!");

      setVisible(false);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error signing up:", errorCode, errorMessage);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("User signed in with Google.");
      setVisible(false);
    } catch (error: any) {
      console.log("Error signing in with Google:", error.message);
    }
  };

  const handleSignInWithPhone = async () => {
    try {
      // Implement your phone authentication flow here
      console.log("User signed in with phone.");
      setVisible(false);
    } catch (error: any) {
      console.log("Error signing in with phone:", error.message);
    }
  };

  return (
    <div>
      <Button auto color="warning" shadow onPress={handler}>
        Join now
      </Button> 
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        
      >
        <Modal.Header >
          <Text id="modal-title" size={18}>
            Welcome to
            <Text b size={18}> JR Tutorials</Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            contentLeft={<Message set="broken" />}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={<Unlock set="broken" />}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Text size={14} className='text-center' >or</Text>
          <Row justify="space-around">
            <button className='py-2 mx-2 font-medium w-full text-center rounded-md bg-[#cdcdcd]' onClick={() => handleSignInWithGoogle()}>
              Google
            </button>
            <button className='py-2 mx-2 font-medium w-full text-center rounded-md bg-[#cdcdcd]' onClick={() => handleSignInWithPhone()}>
              Phone
            </button>
          </Row>
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Link href='/login'>
              <Text size={14}>Login?</Text>
            </Link>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={handleSignUp}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}