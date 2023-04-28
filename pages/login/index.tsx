import React, { useState, useEffect } from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import firebase from "firebase/app";
import { auth } from "../../config/firebase";
import { Message, Unlock } from "react-iconly";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/router';


export default function Login() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: { user: any; }) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in:", user);
        // ...
      })
      .catch((error: { code: any; message: any; }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error signing in:", errorCode, errorMessage);
      });
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
        Login
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
            {/* <Link href='/login'> */}
              <Text size={14}>Login?</Text>
            {/* </Link> */}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={handleSignIn}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
