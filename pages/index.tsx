import React from "react";

export async function getStaticProps({ locale }) {
  return {
    props: {},
    revalidate: 60,
  };
}

const Home = (props) => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Home;
