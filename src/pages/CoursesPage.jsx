import { useEffect, useState } from "react";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import { getCourses, getTeacherCourses } from "../services/courseService";
import { errorAlert } from "../helpers/functions";
import "./CoursesPage.css";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const userType = localStorage.getItem('userType');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        let coursesData;
        if (userType === 'Teacher') {
          // Obtener todos los grades del profesor y extraer cursos únicos
          const grades = await getTeacherCourses(userId); // getTeacherCourses retorna grades para el profe
          // Extraer cursos únicos desde grades (grade.subject)
          const courseMap = {};
          grades.forEach(({ course, students }) => {
            if (course && !courseMap[course.id]) {
              courseMap[course.id] = {
                ...course,
                teacher_name: course.teacher?.user?.name || "",
                modules: [], // Si tienes módulos, agrégalos aquí
                icon: "fas fa-book",
                color: "#0077cc"
              };
            }
          });
          coursesData = Object.values(courseMap);
        } else {
          coursesData = await getCourses();
        }
        
        // Validar que coursesData sea un array
        if (!Array.isArray(coursesData)) {
          throw new Error('La respuesta del servidor no tiene el formato esperado');
        }
        
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error.message);
        errorAlert('Error', 'No se pudieron cargar los cursos', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userType, userId]);

  if (loading) {
    return (
      <>
        <MainHeader />
        <main className="courses-container">
          <div className="loading-indicator">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Cargando cursos...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <MainHeader />
        <main className="courses-container">
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            <p>Error al cargar los cursos. Por favor, intente nuevamente.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MainHeader />
      <main className="courses-container">
        <h1 className="courses-title">
          {userType === 'Teacher' ? 'Mis Cursos Asignados' : 'Cursos Disponibles'}
        </h1>
        <div className="courses-grid">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div 
                key={course.id} 
                className="course-card"
                onClick={() => setSelectedCourse(selectedCourse === course ? null : course)}
              >
                <i className={course.icon} style={{ color: course.color, fontSize: '2rem' }}></i>
                <h2>{course.name}</h2>
                <p className="teacher-name">Prof. {course.teacher_name}</p>
                
                {selectedCourse?.id === course.id && (
                  <div className="course-details">
                    <h3>Módulos del curso:</h3>
                    <ul>
                      {course.modules.map((module, index) => (
                        <li key={index}>{module}</li>
                      ))}
                    </ul>
                    {userType === 'Student' && (
                      <button className="enroll-button">
                        Matricular
                      </button>
                    )}
                    {userType === 'Teacher' && (
                      <button className="manage-button">
                        Gestionar
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-courses-message">
              <i className="fas fa-book-open"></i>
              <p>No hay cursos disponibles en este momento.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CoursesPage;