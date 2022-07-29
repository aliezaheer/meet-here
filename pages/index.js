import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meet at place!</title>
        <meta
          name="description"
          content="Let's meet up at the place to make better connection."
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

// **** These functions below only runs on server side not on client side *****

/////// getStaticProps() is a special function in nextjs to make SEO better by pre-rendring ////////

export async function getStaticProps() {
  //fetch data from an API
  // to establised on mongo cluster
  const client = await MongoClient.connect(
    "mongodb+srv://aliezaheer:rKMry7Zwx40bs9qd@cluster0.wn1kb.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // revalidate props to update and fetching data frequently from client to server
    revalidate: 1, // 360 is representing the time of the fetching data in seconds
  };
}

///// gerServerSideProps() is a special fucntion in nextjs to get data for everyrequest from the client side to server

// export async function gerServerSideProps(context) {
//   const req = context.req; // request object with the key "req"
//   const res = context.res; // responce object with the key "res"

//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
