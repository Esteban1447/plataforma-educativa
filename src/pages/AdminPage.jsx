import { useState, useEffect } from "react";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import "./AdminPage.css";
import { API_BASE_URL } from '../config/api';
import { errorAlert } from "../helpers/functions";
import CourseForm from '../components/CourseForm';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    userType: 'Student',
    // Campos específicos para estudiantes
    grade: '',
    bornDate: '',
    direction: '',
    // Campos específicos para profesores
    speciality: ''
  });

  // Añadir estado para cursos
  const [courses, setCourses] = useState([]);
  // Añadir estado para manejar la asignación de profesores
  const [teachers, setTeachers] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [assignedTeachers, setAssignedTeachers] = useState({});
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [selectedCourseForTeachers, setSelectedCourseForTeachers] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editedName, setEditedName] = useState("");

  // Añadir nuevo estado para el modal de estudiantes
  const [selectedCourseForStudents, setSelectedCourseForStudents] = useState(null);
  const [availableStudents, setAvailableStudents] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/teachers`);
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Añadir función para obtener estudiantes disponibles
  const fetchAvailableStudents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      const data = await response.json();
      setAvailableStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (activeTab === 'courses') {
      fetchCourses();
      fetchTeachers();
    }
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Crear usuario base
      const userResponse = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          phone: newUser.phone,
          userType: newUser.userType
        }),
      });

      if (!userResponse.ok) {
        throw new Error("Error al crear usuario");
      }

      const userData = await userResponse.json();

      // 2. Crear entrada específica según el tipo de usuario
      if (newUser.userType === 'Student') {
        const studentResponse = await fetch(`${API_BASE_URL}/students`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: { id: userData.id },
            grade: parseInt(newUser.grade),
            bornDate: newUser.bornDate,
            direction: newUser.direction
          }),
        });

        if (!studentResponse.ok) {
          throw new Error('Error al registrar estudiante');
        }

        const studentData = await studentResponse.json();

        // Inicializar calificaciones con el nuevo modelo
        const gradesResponse = await fetch(`${API_BASE_URL}/grades`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student: { id: studentData.id },
          }),
        });

        if (!gradesResponse.ok) {
          throw new Error('Error al inicializar calificaciones');
        }
      } else if (newUser.userType === 'Teacher') {
        const teacherResponse = await fetch(`${API_BASE_URL}/teachers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: { id: userData.id },
            speciality: newUser.speciality
          }),
        });

        if (!teacherResponse.ok) {
          throw new Error('Error al registrar profesor');
        }
      }

      await fetchUsers();
      setNewUser({
        name: '',
        email: '',
        phone: '',
        password: '',
        userType: 'Student',
        grade: '',
        bornDate: '',
        direction: '',
        speciality: ''
      });
      
      errorAlert("Éxito", "Usuario creado correctamente", "success");
    } catch (error) {
      errorAlert("Error", "No se pudo crear el usuario", "error");
    }
  };

  // Función para actualizar la lista de cursos
  const handleCourseCreated = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const handleAssignTeacher = async (courseId, teacherId) => {
    try {
      const selectedTeacher = teachers.find(t => t.id === parseInt(teacherId));
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: courses.find(c => c.id === courseId).name,
          teacher: { id: parseInt(teacherId) }
        }),
      });

      if (!response.ok) throw new Error('Error al asignar profesor');
      
      // Actualizar el estado local de profesores asignados
      setAssignedTeachers({
        ...assignedTeachers,
        [courseId]: selectedTeacher.user.name
      });
      
      fetchCourses();
      errorAlert('Éxito', 'Profesor asignado correctamente', 'success');
    } catch (error) {
      errorAlert('Error', 'No se pudo asignar el profesor', 'error');
    }
  };

  const handleCloseModal = () => {
    setSelectedCourseForTeachers(null);
  };

  const handleViewTeachers = (courseId) => {
    // Buscar el curso y sus profesores relacionados
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourseForTeachers(course);
    }
  };

  const handleEditCourse = async (courseId) => {
    const course = courses.find(c => c.id === courseId);
    setEditingCourse(course);
    setEditedName(course.name);
  };

  const handleUpdateCourse = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${editingCourse.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedName,
          teacher: editingCourse.teacher ? { id: editingCourse.teacher.id } : null
        }),
      });

      if (!response.ok) throw new Error('Error al actualizar el curso');

      // Actualizar la lista de cursos
      const updatedCourses = courses.map(course => 
        course.id === editingCourse.id ? { ...course, name: editedName } : course
      );
      setCourses(updatedCourses);
      setEditingCourse(null);
      errorAlert('Éxito', 'Curso actualizado correctamente', 'success');
    } catch (error) {
      errorAlert('Error', 'No se pudo actualizar el curso', 'error');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el curso');
      }

      // Actualizar la lista de cursos eliminando el curso borrado
      setCourses(courses.filter(course => course.id !== courseId));
      errorAlert('Éxito', 'Curso eliminado correctamente', 'success');
    } catch (error) {
      console.error('Error:', error);
      errorAlert('Error', 'No se pudo eliminar el curso', 'error');
    }
  };

  // Añadir función para manejar la matrícula de estudiantes
  const handleEnrollStudent = async (courseId, studentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId }),
      });

      if (!response.ok) throw new Error('Error al matricular estudiante');
      
      fetchCourses();
      errorAlert('Éxito', 'Estudiante matriculado correctamente', 'success');
    } catch (error) {
      errorAlert('Error', 'No se pudo matricular al estudiante', 'error');
    }
  };

  return (
    <>
      <MainHeader />
      <main className="admin-container">
        <h1><i className="fas fa-user-shield"></i> Panel de Administración</h1>
        
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="fas fa-users"></i> Usuarios
          </button>
          <button 
            className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <i className="fas fa-graduation-cap"></i> Cursos
          </button>
          <button 
            className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <i className="fas fa-chart-bar"></i> Estadísticas
          </button>
        </div>

        {activeTab === 'users' && (
          <>
            <div className="admin-section">
              <h2><i className="fas fa-user-plus"></i> Crear Nuevo Usuario</h2>
              <form onSubmit={handleSubmit} className="form">
                {/* Campos comunes */}
                <span className="input-span">
                  <label className="label">Nombre completo</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                </span>

                <span className="input-span">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </span>

                <span className="input-span">
                  <label className="label">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  />
                </span>

                <span className="input-span">
                  <label className="label">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  />
                </span>

                <span className="input-span">
                  <label className="label">Tipo de Usuario</label>
                  <select
                    value={newUser.userType}
                    onChange={(e) => setNewUser({...newUser, userType: e.target.value})}
                  >
                    <option value="Student">Estudiante</option>
                    <option value="Teacher">Profesor</option>
                  </select>
                </span>

                {/* Campos específicos para estudiantes */}
                {newUser.userType === "Student" && (
                  <>
                    <span className="input-span">
                      <label className="label">Grado</label>
                      <input
                        type="number"
                        name="grade"
                        required
                        value={newUser.grade}
                        onChange={(e) => setNewUser({...newUser, grade: e.target.value})}
                      />
                    </span>

                    <span className="input-span">
                      <label className="label">Fecha de Nacimiento</label>
                      <input
                        type="date"
                        name="bornDate"
                        required
                        value={newUser.bornDate}
                        onChange={(e) => setNewUser({...newUser, bornDate: e.target.value})}
                      />
                    </span>

                    <span className="input-span">
                      <label className="label">Dirección</label>
                      <input
                        type="text"
                        name="direction"
                        required
                        value={newUser.direction}
                        onChange={(e) => setNewUser({...newUser, direction: e.target.value})}
                      />
                    </span>
                  </>
                )}

                {/* Campos específicos para profesores */}
                {newUser.userType === "Teacher" && (
                  <span className="input-span">
                    <label className="label">Especialidad</label>
                    <input
                      type="text"
                      name="speciality"
                      required
                      value={newUser.speciality}
                      onChange={(e) => setNewUser({...newUser, speciality: e.target.value})}
                    />
                  </span>
                )}

                <input 
                  className="submit" 
                  type="submit" 
                  value={`Crear ${newUser.userType === 'Student' ? 'Estudiante' : 'Profesor'}`} 
                />
              </form>
            </div>

            <div className="admin-section">
              <h2><i className="fas fa-users"></i> Usuarios Registrados</h2>
              <div className="users-table">
                <div className="table-filters">
                  <input 
                    type="text" 
                    placeholder="Buscar usuario..."
                    className="search-input"
                  />
                  <select className="filter-select">
                    <option value="all">Todos los roles</option>
                    <option value="Student">Estudiantes</option>
                    <option value="Teacher">Profesores</option>
                    <option value="Administrator">Administradores</option>
                  </select>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Tipo</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`user-type ${user.userType.toLowerCase()}`}>
                            {user.userType}
                          </span>
                        </td>
                        <td>
                          <span className={`user-status ${user.status?.toLowerCase() || 'active'}`}>
                            {user.status || 'Activo'}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="edit-button"
                              onClick={() => {/* Función de editar */}}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="delete-button"
                              onClick={async () => {
                                try {
                                  const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
                                    method: "DELETE",
                                    headers: {
                                      'Content-Type': 'application/json'
                                    }
                                  });

                                  if (!response.ok) {
                                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                                  }

                                  // Verificar si el usuario fue eliminado correctamente
                                  const remainingUsers = users.filter(u => u.id !== user.id);
                                  setUsers(remainingUsers);
                                  
                                  errorAlert(
                                    "Éxito", 
                                    "Usuario eliminado correctamente", 
                                    "success"
                                  );
                                } catch (error) {
                                  console.error('Error al eliminar usuario:', error);
                                  errorAlert(
                                    "Error", 
                                    `No se pudo eliminar el usuario: ${error.message}`, 
                                    "error"
                                  );
                                }
                              }}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'courses' && (
          <div className="admin-section">
            <div className="section-header">
              <h2><i className="fas fa-graduation-cap"></i> Gestión de Cursos</h2>
              <div className="section-header-stats">
                <button className="add-button" onClick={() => setShowCourseForm(true)}>
                  <i className="fas fa-plus"></i> Agregar Curso
                </button>
              </div>
            </div>

            {showCourseForm && (
              <CourseForm 
                onCourseCreated={(newCourse) => {
                  handleCourseCreated(newCourse);
                  setShowCourseForm(false);
                }} 
              />
            )}
            
            <div className="users-table">
              <h3>Cursos Registrados</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre del Curso</th>
                    <th>Asignar Profesor</th>
                    <th>Estudiantes Matriculados</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td>{course.id}</td>
                      <td>{course.name}</td>
                      <td>
                        {selectedCourseId === course.id ? (
                          <select
                            onChange={(e) => {
                              handleAssignTeacher(course.id, e.target.value);
                              setSelectedCourseId(null);
                            }}
                            defaultValue=""
                          >
                            <option value="" disabled>Seleccionar profesor</option>
                            {teachers.map(teacher => (
                              <option key={teacher.id} value={teacher.id}>
                                {teacher.user?.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div className="teacher-info">
                            {course.teacher?.user?.name ? (
                              <>
                                <span>{course.teacher.user.name}</span>
                                <button 
                                  className="edit-button"
                                  onClick={() => setSelectedCourseId(course.id)}
                                  title="Cambiar profesor"
                                >
                                  <i className="fas fa-user-edit"></i>
                                </button>
                              </>
                            ) : (
                              <>
                                <button 
                                  className="edit-button"
                                  onClick={() => setSelectedCourseId(course.id)}
                                  title="Asignar profesor"
                                >
                                  <i className="fas fa-user-plus"></i>
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className="student-count">
                          {course.students?.length || 0} estudiantes
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="edit-button" 
                            title="Editar curso"
                            onClick={() => handleEditCourse(course.id)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="view-button" 
                            title="Ver profesores"
                            onClick={() => handleViewTeachers(course.id)}
                          >
                            <i className="fas fa-users"></i>
                          </button>
                          <button 
                            className="view-button" 
                            title="Gestionar estudiantes"
                            onClick={() => {
                              setSelectedCourseForStudents(course);
                              fetchAvailableStudents();
                            }}
                          >
                            <i className="fas fa-user-graduate"></i>
                          </button>
                          <button 
                            className="delete-button" 
                            title="Eliminar curso"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="admin-section">
            <h2><i className="fas fa-chart-bar"></i> Estadísticas</h2>
            {/* Contenido de estadísticas */}
          </div>
        )}

        {/* Modal de profesores */}
        {selectedCourseForTeachers && (
          <div className="modal-backdrop" onClick={handleCloseModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Profesor del curso: {selectedCourseForTeachers.name}</h3>
                <button className="modal-close" onClick={handleCloseModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                {selectedCourseForTeachers.teacher ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Especialidad</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{selectedCourseForTeachers.teacher.user?.name}</td>
                        <td>{selectedCourseForTeachers.teacher.speciality}</td>
                        <td>
                          <span className="teacher-status active">
                            Activo
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <p className="no-teachers">No hay profesor asignado a este curso</p>
                )}
              </div>
            </div>
          </div>
        )}

        {editingCourse && (
          <div className="modal-backdrop" onClick={() => setEditingCourse(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Editar Curso</h3>
                <button className="modal-close" onClick={() => setEditingCourse(null)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nombre del Curso:</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button
                  className="submit-button" 
                  onClick={handleUpdateCourse}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de estudiantes */}
        {selectedCourseForStudents && (
          <div className="modal-backdrop" onClick={() => setSelectedCourseForStudents(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Gestionar Estudiantes: {selectedCourseForStudents.name}</h3>
                <button className="modal-close" onClick={() => setSelectedCourseForStudents(null)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <h4>Estudiantes Matriculados</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCourseForStudents.students?.map(student => (
                      <tr key={student.id}>
                        <td>{student.user?.name}</td>
                        <td>{student.user?.email}</td>
                        <td>
                          <span className="student-status active">Activo</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h4>Matricular Nuevo Estudiante</h4>
                <select 
                  onChange={(e) => {
                    if (e.target.value) {
                      handleEnrollStudent(selectedCourseForStudents.id, e.target.value);
                    }
                  }}
                  defaultValue=""
                >
                  <option value="">Seleccionar estudiante</option>
                  {availableStudents
                    .filter(student => !selectedCourseForStudents.students?.some(
                      enrolled => enrolled.id === student.id
                    ))
                    .map(student => (
                      <option key={student.id} value={student.id}>
                        {student.user?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default AdminPage;
