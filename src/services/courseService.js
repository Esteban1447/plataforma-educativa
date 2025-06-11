import { API_BASE_URL } from '../config/api';

const API_URL = API_BASE_URL;

export const getCourses = async () => {
  console.log('[CourseService] Fetching all courses...');
  try {
    const response = await fetch(`${API_URL}/courses`);
    if (!response.ok) {
      console.error('[CourseService] Error fetching courses:', response.status);
      throw new Error('Error fetching courses');
    }
    const data = await response.json();
    console.log('[CourseService] Courses fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('[CourseService] Error:', error);
    throw error;
  }
};

export const getTeacherCourses = async (teacherId) => {
  // Devuelve todos los cursos que da el profesor
  try {
    const coursesRes = await fetch(`${API_URL}/courses?teacher.id=${teacherId}`);
    if (!coursesRes.ok) throw new Error('Error fetching courses');
    const courses = await coursesRes.json();
    // Retorna todos los cursos asignados al profesor
    return Array.isArray(courses) ? courses : [];
  } catch (error) {
    console.error('[CourseService] Error:', error);
    throw error;
  }
};

export const verifyTeacher = async (teacherId) => {
  console.log('[CourseService] Verifying teacher:', teacherId);
  try {
    const response = await fetch(`${API_URL}/teachers/${teacherId}`);
    if (!response.ok) {
      console.error('[CourseService] Error verifying teacher:', response.status);
      return false;
    }
    const data = await response.json();
    console.log('[CourseService] Teacher verified successfully:', data);
    return true;
  } catch (error) {
    console.error('[CourseService] Error:', error);
    return false;
  }
};

export const enrollStudentInCourse = async (courseId, studentId) => {
  try {
    // Obtener el curso para saber el nombre
    const courseRes = await fetch(`${API_URL}/courses/${courseId}`);
    if (!courseRes.ok) throw new Error('No se pudo obtener el curso');
    const course = await courseRes.json();

    // Buscar el subject que corresponde al curso (por nombre igual y courseId), incluyendo los grades embebidos
    const subjectsRes = await fetch(`${API_URL}/subjects?course.id=${courseId}&_embed=grades`);
    if (!subjectsRes.ok) throw new Error('No se pudo obtener subjects');
    const subjects = await subjectsRes.json();
    // Normalizar nombre para comparación robusta
    const normalizeName = name => name && name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    const subject = subjects.find(
      s => normalizeName(s.name) === normalizeName(course.name) && s.course?.id === courseId
    );
    if (!subject) throw new Error('No se encontró el subject correspondiente al curso');

    // Verificar si ya existe un grade para este student y subject usando los grades embebidos en el subject
    const alreadyEnrolled = Array.isArray(subject.grades)
      ? subject.grades.filter(g => g.student && g.student.id === studentId)
      : [];
    if (alreadyEnrolled.length > 0) {
      throw new Error('El estudiante ya está matriculado en este curso');
    }

    // Crear el registro en grades
    const response = await fetch(`${API_URL}/grades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student: { id: studentId },
        subject: { id: subject.id },
        evaluationDate: null,
        score: null
      }),
    });

    if (!response.ok) throw new Error('Error al matricular estudiante');
    return await response.json();
  } catch (error) {
    console.error('[CourseService] Error:', error);
    throw error;
  }
};

export const addGrade = async (courseId, studentId, grade) => {
  try {
    const response = await fetch(`${API_URL}/grades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseId: courseId,
        studentId: studentId,
        grade: grade,
        date: new Date().toISOString()
      }),
    });
    
    if (!response.ok) throw new Error('Error al asignar nota');
    return await response.json();
  } catch (error) {
    console.error('[CourseService] Error:', error);
    throw error;
  }
};

export const getStudentGrades = async (studentId) => {
  try {
    const response = await fetch(`${API_URL}/grades/student/${studentId}`);
    if (!response.ok) throw new Error('Error al obtener notas');
    return await response.json();
  } catch (error) {
    console.error('[CourseService] Error:', error);
    throw error;
  }
};

// Cambia getCourseGrades para aceptar courseId y devolver todos los grades de todos los subjects de ese curso
export const getCourseGrades = async (courseId) => {
  try {
    // Obtener todos los subjects del curso
    const subjectsRes = await fetch(`${API_URL}/subjects?course.id=${courseId}`);
    if (!subjectsRes.ok) throw new Error('No se pudieron obtener las materias del curso');
    const subjects = await subjectsRes.json();
    let allGrades = [];
    for (const subject of subjects) {
      const gradesRes = await fetch(`${API_URL}/grades?subjectId=${subject.id}`);
      if (!gradesRes.ok) continue;
      const grades = await gradesRes.json();
      allGrades = allGrades.concat(grades);
    }
    // Filtrar grades con subject válido
    allGrades = allGrades.filter(g => g.subject !== null);
    return allGrades;
  } catch (error) {
    console.error('[CourseService] Error:', error);
    throw error;
  }
};

// Nueva función: obtener todos los grades de un curso (por todos sus subjects)
export const getAllGradesForCourse = async (courseId) => {
  try {
    // Obtener todos los subjects del curso
    const subjectsRes = await fetch(`${API_URL}/subjects?course.id=${courseId}`);
    if (!subjectsRes.ok) throw new Error('No se pudieron obtener las materias del curso');
    const subjects = await subjectsRes.json();
    let allGrades = [];
    for (const subject of subjects) {
      const gradesRes = await fetch(`${API_URL}/grades?subjectId=${subject.id}`);
      if (!gradesRes.ok) continue;
      const grades = await gradesRes.json();
      allGrades = allGrades.concat(grades);
    }
    // Filtrar grades con subject válido
    allGrades = allGrades.filter(g => g.subject !== null);
    return allGrades;
  } catch (error) {
    console.error('[CourseService] Error:', error);
    throw error;
  }
};

export const updateGrade = async (gradeId, newGrade) => {
  try {
    // Obtener los datos actuales del grade
    const currentRes = await fetch(`${API_URL}/grades/${gradeId}`);
    if (!currentRes.ok) throw new Error('No se pudo obtener la calificación actual');
    const currentGrade = await currentRes.json();

    // Construir el body con los datos previos, reemplazando solo score
    const { id, ...gradeData } = currentGrade; // Elimina id si tu backend no lo requiere en el body
    const updatedGrade = { ...gradeData, score: newGrade };

    const response = await fetch(`${API_URL}/grades/${gradeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGrade),
    });

    if (!response.ok) throw new Error('Error al actualizar nota');
    return await response.json();
  } catch (error) {
    console.error('[CourseService] Error:', error);
    throw error;
  }
};

export const initializeStudentGrades = async (studentId) => {
  try {
    const response = await fetch(`${API_URL}/grades/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        evaluationDate: new Date().toISOString().split('T')[0]
      }),
    });
    
    if (!response.ok) throw new Error('Error al inicializar calificaciones');
    return await response.json();
  } catch (error) {
    console.error('[CourseService] Error:', error);
    throw error;
  }
};

export const isStudentEnrolled = async (courseId, studentId) => {
  try {
    const response = await fetch(`${API_URL}/courses/${courseId}/students/${studentId}`);
    return response.ok;
  } catch (error) {
    console.error('[CourseService] Error:', error);
    return false;
  }
};
