import { useState, useEffect } from "react";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import "./NotasPage.css";
import { errorAlert } from "../helpers/functions";
import { API_BASE_URL } from "../config/api";

function NotasPage() {
  const [courses, setCourses] = useState([]);
  const [gradesByCourse, setGradesByCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [editGradeId, setEditGradeId] = useState(null);
  const [editGradeValue, setEditGradeValue] = useState('');
  const [studentGrades, setStudentGrades] = useState([]);
  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('userType');
  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (userType === 'Teacher') {
          // 1. Obtener cursos asignados al profesor usando teacherId de localStorage
          if (!teacherId) throw new Error('No se encontró el ID del profesor');
          const coursesRes = await fetch(`${API_BASE_URL}/courses?teacherId=${teacherId}`);
          if (!coursesRes.ok) throw new Error('No se pudo obtener los cursos del profesor');
          const teacherCourses = await coursesRes.json();
          setCourses(teacherCourses);

          // 2. Para cada curso, obtener materias y grades
          const gradesByCourseTemp = {};
          for (const course of teacherCourses) {
            // Obtener materias del curso
            const subjectsRes = await fetch(`${API_BASE_URL}/subjects?courseId=${course.id}`);
            const subjects = await subjectsRes.json();

            // Para cada materia, obtener grades
            let allGrades = [];
            for (const subject of subjects) {
              const gradesRes = await fetch(`${API_BASE_URL}/grades?subjectId=${subject.id}`);
              const grades = await gradesRes.json();
              // grades[i].student puede ser null si no está bien creado
              allGrades = allGrades.concat(
                grades.filter(g => g.student && g.student.id)
              );
            }

            // Agrupar por estudiante
            const studentsMap = {};
            allGrades.forEach(g => {
              const studentId = g.student.id;
              if (!studentsMap[studentId]) {
                studentsMap[studentId] = {
                  student: g.student,
                  grades: []
                };
              }
              studentsMap[studentId].grades.push({
                subject: subjects.find(s => s.id === (g.subject?.id || g.subjectId)),
                grade: g.score,
                gradeId: g.id
              });
            });

            gradesByCourseTemp[course.id] = {
              subjects,
              students: Object.values(studentsMap)
            };
          }
          setGradesByCourse(gradesByCourseTemp);
        } else if (userType === 'Student') {
          // Obtener notas del estudiante
          const response = await fetch(`${API_BASE_URL}/grades?student.id=${userId}&_expand=subject`);
          const grades = await response.json();
          setStudentGrades(grades.filter(g => g.subject));
        }
      } catch (error) {
        errorAlert('Error', 'No se pudieron cargar los cursos y estudiantes', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [userId, userType, teacherId]);

  const handleEditClick = (gradeId, currentScore) => {
    setEditGradeId(gradeId);
    setEditGradeValue(currentScore !== null ? currentScore : '');
  };

  const handleSaveClick = async (gradeId) => {
    try {
      // Obtener los datos actuales del grade
      const currentRes = await fetch(`${API_BASE_URL}/grades/${gradeId}`);
      if (!currentRes.ok) throw new Error('No se pudo obtener la calificación actual');
      const currentGrade = await currentRes.json();

      // Construir el body con el formato requerido
      const updatedGrade = {
        student: { id: currentGrade.student?.id },
        subject: { id: currentGrade.subject?.id },
        score: editGradeValue,
        evaluationDate: new Date().toISOString().split('T')[0]
      };

      const response = await fetch(`${API_BASE_URL}/grades/${gradeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGrade)
      });
      if (!response.ok) throw new Error('Error al actualizar nota');
      errorAlert('Éxito', 'Nota actualizada correctamente', 'success');
      setEditGradeId(null);
      setEditGradeValue('');
      // Refrescar datos
      window.location.reload();
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
                  courses.map((course) => {
                    const courseData = gradesByCourse[course.id];
                    if (!courseData) return null;
                    const { subjects, students } = courseData;
                    return (
                      <div key={course.id} className="course-grades-block">
                        <h3>{course.name}</h3>
                        <table>
                          <thead>
                            <tr>
                              <th>Estudiante</th>
                              {/* Cambiado: mostrar "Notas" en vez del nombre de la materia */}
                              {subjects.map(subject => (
                                <th key={subject.id}>Notas</th>
                              ))}
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {students.length > 0 ? (
                              students.map(({ student, grades }) => (
                                <tr key={student.id}>
                                  <td>{student.user?.name || student.name || `Estudiante #${student.id}`}</td>
                                  {subjects.map(subject => {
                                    const gradeObj = grades.find(g => g.subject && g.subject.id === subject.id);
                                    return (
                                      <td key={subject.id}>
                                        {gradeObj
                                          ? (
                                            editGradeId === gradeObj.gradeId ? (
                                              <>
                                                <input
                                                  type="number"
                                                  min="0"
                                                  max="100"
                                                  value={editGradeValue}
                                                  onChange={e => setEditGradeValue(e.target.value)}
                                                  style={{ width: 70 }}
                                                />
                                                <button
                                                  className="save-grade-btn"
                                                  onClick={() => handleSaveClick(gradeObj.gradeId)}
                                                >Guardar</button>
                                                <button
                                                  className="cancel-grade-btn"
                                                  onClick={handleCancelEdit}
                                                >Cancelar</button>
                                              </>
                                            ) : (
                                              <>
                                                {gradeObj.grade !== null ? gradeObj.grade : 'Sin calificar'}
                                              </>
                                            )
                                          )
                                          : 'Sin calificar'
                                        }
                                      </td>
                                    );
                                  })}
                                  <td>
                                    {/* Acciones: un botón editar por cada materia */}
                                    {subjects.map(subject => {
                                      const gradeObj = grades.find(g => g.subject && g.subject.id === subject.id);
                                      return (
                                        <span key={subject.id} style={{ marginRight: 8 }}>
                                          {gradeObj && editGradeId !== gradeObj.gradeId && (
                                            <button
                                              className="edit-grade-btn"
                                              onClick={() => handleEditClick(gradeObj.gradeId, gradeObj.grade)}
                                            >Editar</button>
                                          )}
                                        </span>
                                      );
                                    })}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={1 + subjects.length + 1}>No hay estudiantes matriculados en este curso.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    );
                  })
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