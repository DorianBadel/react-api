import Navigation from "../components/navigation/Navigation";

function MainBody(props: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {props.children}
    </>
  );
}

export default MainBody;
