import { useDashboard } from "../../context/DashboardContext";

export default function MyCourses() {
  const { dashboard } = useDashboard();

  return (
    <div>
      <h1>My Courses</h1>

      {dashboard.myCourses.map((c) => (
        <div key={c.courseId} className="course-card">
          <h2>{c.title}</h2>
          <p>{c.description}</p>
          <p>Price: {c.price} EGP</p>
        </div>
      ))}
    </div>
  );
}
