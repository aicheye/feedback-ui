import { Link } from "react-router-dom";
import Card from "../components/shared/Card";

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About this Project</h1>
        <p>
          This project is a simple feedback form that allows users to submit
          feedback and view feedback statistics.
        </p>
        <p>The front end is built with pure React and Framer Motion.</p>
        <p>The back end is built with Firebase and Firestore.</p>
        <p>Version: 1.0.0</p>

        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </Card>
  );
}

export default AboutPage;
