import {
  BiLogoAngular,
  BiLogoNodejs,
  BiLogoPhp,
  BiLogoReact,
} from "react-icons/bi";
import "../styles/content.css";

const Card = () => {
  const course = [
    {
      id: 1,
      title: "React.js",
      icon: <BiLogoReact />,
    },
    {
      id: 2,
      title: "Node.js",
      icon: <BiLogoNodejs />,
    },
    {
      id: 3,
      title: "PHP",
      icon: <BiLogoPhp />,
    },
    {
      id: 4,
      title: "Angular",
      icon: <BiLogoAngular />,
    },
  ];
  return (
    <>
      <div className="card-container">
        {course.map((item) => (
          <div key={item.id} className="card">
            <div className="card-cover">{item.icon}</div>
            <div className="card-title">
              <h2>{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
