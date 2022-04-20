import { Appwrite } from 'appwrite';

// Init your Web SDK
const appwrite = new Appwrite();

appwrite.setEndpoint('http://localhost/v1').setProject('6241ab870383db7a19ed');

appwrite.account.createAnonymousSession().then(
  (response) => {
    console.log(response);
  },
  (error) => {
    console.log(error);
  }
);

export const db = appwrite.database;
export const COLLECTION_ID = '6241abb036e351800249';