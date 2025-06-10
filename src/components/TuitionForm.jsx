import { useState, useEffect } from 'react';
import { getCourses, enrollStudentInCourse } from '../services/courseService';
import { getStudentTuitionCount } from '../services/tuitionService';
import { errorAlert } from '../helpers/functions';
import './TuitionForm.css';

function TuitionForm({ studentId, onTuitionCreated }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const availableCourses = await getCourses();
      setCourses(availableCourses);
      setLoading(false);
    } catch (error) {
      errorAlert('Error', 'No se pudieron cargar los cursos', 'error');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Verificar el límite de matrículas
      const tuitionCount = await getStudentTuitionCount(studentId);
      if (tuitionCount >= 3) {
        errorAlert('Error', 'Ya has alcanzado el límite de 3 matrículas', 'warning');
        return;
      }

      await enrollStudentInCourse(selectedCourse, studentId);
      errorAlert('Éxito', 'Matrícula realizada correctamente', 'success');
      setSelectedCourse('');
      if (onTuitionCreated) onTuitionCreated();
    } catch (error) {
      errorAlert('Error', 'No se pudo realizar la matrícula', 'error');
    }
  };

  if (loading) {
    return <div className="loading">Cargando cursos...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="tuition-form">
      <div className="form-group">
        <label>Selecciona un curso:</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          required
        >
          <option value="">-- Seleccionar curso --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="submit-button">
        Matricular
      </button>
    </form>
  );
}

export default TuitionForm;
