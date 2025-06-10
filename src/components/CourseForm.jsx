import { useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { normalizeName, errorAlert } from '../helpers/functions';

function CourseForm({ onCourseCreated }) {
  const [courseName, setCourseName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Normalizar el nombre del curso
      const normalizedName = normalizeName(courseName);
      
      // Verificar si ya existe un curso con el mismo nombre
      const existingCoursesResponse = await fetch(`${API_BASE_URL}/courses`);
      const existingCourses = await existingCoursesResponse.json();
      
      const courseExists = existingCourses.some(course => 
        normalizeName(course.name) === normalizedName
      );

      if (courseExists) {
        errorAlert(
          "Error",
          "Ya existe un curso con este nombre",
          "error"
        );
        return;
      }

      // Si no existe, crear el curso
      const response = await fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: normalizedName // Guardar el nombre normalizado
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el curso');
      }

      const newCourse = await response.json();

      // Crear el subject asociado al curso
      const subjectResponse = await fetch(`${API_BASE_URL}/subjects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: normalizedName,
          course: { id: newCourse.id }
        }),
      });

      if (!subjectResponse.ok) {
        throw new Error('Error al crear el subject');
      }

      onCourseCreated(newCourse);
      setCourseName('');
      errorAlert("Éxito", "Curso y materia creados correctamente", "success");

    } catch (error) {
      console.error('Error:', error);
      errorAlert("Error", "No se pudo crear el curso y la materia", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <div className="form-group">
        <label>Nombre del Curso:</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Crear Curso
      </button>
    </form>
  );
}

export default CourseForm;
