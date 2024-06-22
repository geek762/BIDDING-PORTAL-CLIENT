import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
  deleteUser,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth, database } from '../config';

export const doCreateUserWithEmailAndPassword = async (
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  isCompany,
  companyWebsite
) => {
  await setDoc(doc(database, 'users', email), {
    firstName,
    lastName,
    phoneNumber,
    email,
    designation: isCompany ? 'COMPANY' : 'CLIENT',
    ...(isCompany && { companyWebsite }),
  });
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(user);
  return user;
};

export const doResendVerificationEmail = () => sendEmailVerification(auth.currentUser);

export const doSignInWithEmailAndPassword = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const doDeleteUser = (user) => deleteUser(user);

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const { user } = result;

  const document = await getDoc(doc(database, 'users', user.email));

  if (!document.data()) {
    doDeleteUser(user);
    return false;
  }
  return user;
};

export const doSignOut = () => auth.signOut();

export const doPasswordReset = (email) => sendPasswordResetEmail(auth, email);

export const doPasswordChange = (password) => updatePassword(auth.currentUser, password);

// export const doSendEmailVerification = () =>
//   sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/admin/feed`,
//   });

export const doSignInWithPhoneNumber = (phoneNumber, recaptcha) =>
  signInWithPhoneNumber(auth, phoneNumber, recaptcha);
