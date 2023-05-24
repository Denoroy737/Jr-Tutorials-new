import React, { useState, useEffect } from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import firebase from "firebase/app";
import { auth } from "../../config/firebase";
import { Message, Unlock } from "react-iconly";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/router';
import Link from "next/link";


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
    <div className="text-white">
      <Button auto color="warning" shadow onPress={handler}>
        Login
      </Button>
      <Modal
        css={{ background: '#202020', }}
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header >
          <Text id="modal-title" color="white" size={18}>
            Welcome to
            <Text b color="white" size={18}> JR Tutorials</Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <form action="">

            <Input
              clearable
              bordered
              css={{ borderColor: "#fff" }}
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              contentLeft={<Message set="broken" primaryColor="white" />}
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
              contentLeft={<Unlock set="broken" primaryColor="white" />}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Text size={14} className='text-center' color='gray' >or</Text>
            <Row color="white" justify="space-around">
              <button className='py-2 mx-2 flex justify-center font-medium w-full text-center rounded-md bg-[#cdcdcd]' onClick={() => handleSignInWithGoogle()}>
                <svg className='mx-2' xmlns="http://www.w3.org/2000/svg" width="22" height="22" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
                Google
              </button>
              <button className='py-2 mx-2 font-medium w-full text-center rounded-md bg-[#cdcdcd]' onClick={() => handleSignInWithPhone()}>
                Phone
              </button>
            </Row>
            <Row justify="space-between">
              <Checkbox>
                <Text color="lightgray" size={14}>Remember me</Text>
              </Checkbox>
              <Link href='/login'>
                <Text color="lightgray" size={14}>Forget Password?</Text>
              </Link>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={handleSignIn}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
