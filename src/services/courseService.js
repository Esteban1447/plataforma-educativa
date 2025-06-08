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
  console.log('[CourseService] Fetching courses for teacher:', teacherId);
  try {
    const response = await fetch(`${API_URL}/courses/teacher/${teacherId}`);
    if (!response.ok) {
      console.error('[CourseService] Error fetching teacher courses:', response.status);
      throw new Error('Error fetching teacher courses');
    }
    const data = await response.json();
    console.log('[CourseService] Teacher courses fetched successfully:', data);
    return data;
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
    const response = await fetch(`${API_URL}/courses/${courseId}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        enrollmentDate: new Date().toISOString(),
        status: 'ACTIVE'
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

export const getCourseGrades = async (courseId) => {
  try {
    const response = await fetch(`${API_URL}/grades/course/${courseId}`);
    if (!response.ok) throw new Error('Error al obtener notas del curso');
    return await response.json();
  } catch (error) {
    console.error('[CourseService] Error:', error);
    throw error;
  }
};

export const updateGrade = async (gradeId, newGrade) => {
  try {
    const response = await fetch(`${API_URL}/grades/${gradeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grade: newGrade,
        updateDate: new Date().toISOString()
      }),
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
