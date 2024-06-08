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
        <p>
          The frontend is built with Javascript, NodeJS, React 18, and Framer
          Motion. The backend is on Google Firebase and Cloud Firestore. It is
          currently set to read-only for safety reasons.
        </p>
        <p>
          This project was made as part of Brad Traversy's React Front To Back
          course on{" "}
          <a
            href="https://www.udemy.com/course/react-front-to-back-2022"
            rel="noreferrer"
          >
            Udemy
          </a>
          .
        </p>
        <p>
          Version:{" "}
          <a href="https://github.com/aicheye/feedback-ui" rel="noreferrer">
            1.0.0
          </a>
        </p>

        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </Card>
  );
}

export default AboutPage;
