import "../styles/teacherList.css";
import image from "../assets/male-teacher.jpg";

const TeacherList = () => {
  const teachers = [
    {
      image: image,
      name: "Mr.Frank",
      duration: "1 hour lesson",
      cost: "100",
    },
    {
      image: image,
      name: "Mr.Frank",
      duration: "1 hour lesson",
      cost: "100",
    },
    {
      image: image,
      name: "Mr.Frank",
      duration: "1 hour lesson",
      cost: "100",
    },
    {
      image: image,
      name: "Mr.Frank",
      duration: "1 hour lesson",
      cost: "100",
    },
  ];

  return (
    <>
      <div className="teacher-list">
        <div className="list-header">
          <h2>Teachers</h2>
          <select>
            <option value="english">English</option>
            <option value="spaninsh">Spaninsh</option>
            <option value="russian">Russian</option>
          </select>
        </div>
        <div className="list-container">
          {teachers.map((teacher) => (
            <>
              <div key={teacher.id} className="list">
                <div className="teacher-details">
                  <img src={teacher.image} alt={teacher.name} />
                  <h2>{teacher.name}</h2>
                </div>
                <span>{teacher.duration}</span>
                <span>${teacher.cost}/hr.</span>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeacherList;
