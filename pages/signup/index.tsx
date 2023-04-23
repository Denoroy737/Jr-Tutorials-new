import React, { useState, useEffect } from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../config/firebase";
import { updateDoc, doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { Message, Unlock } from "react-iconly";
import type { UserCredential } from "firebase/auth";
import { useRouter } from 'next/router';

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
        // User is logged in, navigate to the desired page
        router.push('/');
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
  
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: name,
          photoURL: photoUrl,
        });
        console.log("Profile updated successfully!");
      } else {
        console.log("Error: User not authenticated.");
      }
  
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
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to
            <Text b size={18}>
              NextUI
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text b>Sign up</Text>
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
          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            contentLeft={<Message set="broken" />}
            placeholder="Name"
            clearable
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            contentLeft={<Message set="broken" />}
            placeholder="Profile Photo URL"
            clearable
            onChange={(e) => setPhotoUrl(e.target.value)}
            value={photoUrl}
          />
          <Row justify="space-between">
            <Checkbox name="checkbox" />
            <Text small>
              I agree to the{" "}
              <Text small color="#0055b3">
                terms and conditions
              </Text>
            </Text>
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