import { useState, useEffect } from "react";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import "./NotasPage.css";
import { errorAlert } from "../helpers/functions";
import { getTeacherCourses, getCourseGrades, updateGrade, getStudentGrades } from "../services/courseService";

function NotasPage() {
  const [courses, setCourses] = useState([]);
  const [courseStudents, setCourseStudents] = useState({});
  const [loading, setLoading] = useState(false);
  const [editGradeId, setEditGradeId] = useState(null);
  const [editGradeValue, setEditGradeValue] = useState('');
  const [studentGrades, setStudentGrades] = useState([]);
  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (userType === 'Teacher') {
          // Obtener todos los cursos asignados al profesor
          const teacherCourses = await getTeacherCourses(userId);
          setCourses(teacherCourses);

          // Para cada curso, obtener los subjects y sus notas
          const studentsByCourse = {};
          for (const course of teacherCourses) {
            // Obtener subjects del curso
            const subjectsRes = await fetch(`http://localhost:8080/subjects?course.id=${course.id}`);
            const subjects = await subjectsRes.json();
            // Para cada subject, obtener las notas
            let gradesArr = [];
            for (const subject of subjects) {
              const grades = await getCourseGrades(subject.id); // Usar subject.id
              gradesArr = gradesArr.concat(
                grades.map(g => ({
                  student: g.student,
                  grade: g.score,
                  gradeId: g.id,
                  subject: g.subject
                }))
              );
            }
            studentsByCourse[course.id] = gradesArr;
          }
          setCourseStudents(studentsByCourse);
        } else if (userType === 'Student') {
          // Obtener notas del estudiante
          const grades = await getStudentGrades(userId);
          setStudentGrades(grades);
        }
      } catch (error) {
        errorAlert('Error', 'No se pudieron cargar los cursos y estudiantes', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [userId, userType]);

  const handleEditClick = (gradeId, currentScore) => {
    setEditGradeId(gradeId);
    setEditGradeValue(currentScore !== null ? currentScore : '');
  };

  const handleSaveClick = async (gradeId) => {
    try {
      await updateGrade(gradeId, editGradeValue);
      errorAlert('Éxito', 'Nota actualizada correctamente', 'success');
      // Refrescar estudiantes y notas del curso correspondiente
      // Buscar el subjectId correcto para este grade
      let subjectId = null;
      let courseId = null;
      Object.keys(courseStudents).forEach(cid => {
        const found = courseStudents[cid].find(s => s.gradeId === gradeId);
        if (found && found.subject && found.subject.id) {
          subjectId = found.subject.id;
          courseId = cid;
        }
      });
      if (subjectId && courseId) {
        const grades = await getCourseGrades(subjectId);
        setCourseStudents(prev => ({
          ...prev,
          [courseId]: [
            ...prev[courseId].filter(g => g.subject?.id !== subjectId),
            ...grades.map(g => ({
              student: g.student,
              grade: g.score,
              gradeId: g.id,
              subject: g.subject
            }))
          ]
        }));
      }
      setEditGradeId(null);
      setEditGradeValue('');
    } catch (error) {
      errorAlert('Error', 'No se pudo actualizar la nota', 'error');
    }
  };

  const handleCancelEdit = () => {
    setEditGradeId(null);
    setEditGradeValue('');
  };

  return (
    <>
      <MainHeader />
      <main className="notas-container">
        <h1><i className="fas fa-book"></i> Notas</h1>
        <div className="notas-content">
          {userType === 'Teacher' ? (
            <div className="grades-table">
              <h2>Notas de mis cursos</h2>
              {loading ? (
                <p>Cargando notas...</p>
              ) : (
                courses && courses.length > 0 ? (
                  courses.map((course) => (
                    <div key={course.id} className="course-grades-block">
                      <h3>{course.name}</h3>
                      <table>
                        <thead>
                          <tr>
                            <th>Estudiante</th>
                            <th>Nota</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(courseStudents[course.id] || []).filter(
                            item => item.student && item.subject && item.subject.course && item.subject.course.id === course.id
                          ).length > 0 ? (
                            (courseStudents[course.id] || [])
                              .filter(
                                item => item.student && item.subject && item.subject.course && item.subject.course.id === course.id
                              )
                              .map(({ student, grade, gradeId }) => (
                                <tr key={gradeId}>
                                  <td>{student?.user?.name}</td>
                                  <td>
                                    {editGradeId === gradeId ? (
                                      <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={editGradeValue}
                                        onChange={e => setEditGradeValue(e.target.value)}
                                        style={{ width: 70 }}
                                      />
                                    ) : (
                                      grade !== null ? grade : 'Sin calificar'
                                    )}
                                  </td>
                                  <td>
                                    {editGradeId === gradeId ? (
                                      <>
                                        <button
                                          className="save-grade-btn"
                                          onClick={() => handleSaveClick(gradeId)}
                                        >
                                          Guardar
                                        </button>
                                        <button
                                          className="cancel-grade-btn"
                                          onClick={handleCancelEdit}
                                        >
                                          Cancelar
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        className="edit-grade-btn"
                                        onClick={() => handleEditClick(gradeId, grade)}
                                      >
                                        Editar
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td colSpan="3">No hay estudiantes matriculados en este curso.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ))
                ) : (
                  <p>No hay cursos asignados.</p>
                )
              )}
            </div>
          ) : (
            // Vista para estudiantes: mostrar solo materia y nota, y promedio de notas
            <div className="grades-table">
              <h2>Mis Notas</h2>
              {loading ? (
                <p>Cargando notas...</p>
              ) : (
                studentGrades && studentGrades.length > 0 ? (
                  <>
                    <table>
                      <thead>
                        <tr>
                          <th>Materia</th>
                          <th>Nota</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentGrades.map((grade) => (
                          <tr key={grade.id}>
                            <td>{grade.subject?.name || '-'}</td>
                            <td>{grade.score !== null && grade.score !== undefined ? grade.score : 'Sin calificar'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Promedio de notas */}
                    <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                      Promedio:&nbsp;
                      {(() => {
                        const validScores = studentGrades
                          .map(g => g.score)
                          .filter(score => typeof score === 'number');
                        if (validScores.length === 0) return 'Sin calificar';
                        const avg = validScores.reduce((a, b) => a + b, 0) / validScores.length;
                        return avg.toFixed(2);
                      })()}
                    </div>
                    {/* Cartel de aprobado/reprobado */}
                    {(() => {
                      const validScores = studentGrades
                        .map(g => g.score)
                        .filter(score => typeof score === 'number');
                      if (validScores.length === 0) return null;
                      const avg = validScores.reduce((a, b) => a + b, 0) / validScores.length;
                      if (avg > 3) {
                        return (
                          <div style={{
                            marginTop: '0.5rem',
                            background: '#d4edda',
                            color: '#155724',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            display: 'inline-block'
                          }}>
                            Aprobaste
                          </div>
                        );
                      } else {
                        return (
                          <div style={{
                            marginTop: '0.5rem',
                            background: '#f8d7da',
                            color: '#721c24',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            display: 'inline-block'
                          }}>
                            Reprobaste
                          </div>
                        );
                      }
                    })()}
                  </>
                ) : (
                  <p>No tienes notas registradas.</p>
                )
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default NotasPage;