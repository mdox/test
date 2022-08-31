import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <p>Let's get a mood for Formula1 drivers, shall we?</p>
      <Link to="/drivers">Go!</Link>
    </>
  );
}
