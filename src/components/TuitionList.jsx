import { useState, useEffect } from 'react';
import { getTuitions, cancelTuition } from '../services/tuitionService';
import { errorAlert } from '../helpers/functions';
import './TuitionList.css';

function TuitionList({ studentId, isAdmin = false }) {
  const [tuitions, setTuitions] = useState([]);

  useEffect(() => {
    loadTuitions();
  }, [studentId]);

  const loadTuitions = async () => {
    try {
      const data = await getTuitions(studentId);
      setTuitions(data);
    } catch (error) {
      errorAlert('Error', 'No se pudieron cargar las matrículas', 'error');
    }
  };

  const handleCancelTuition = async (tuitionId) => {
    try {
      await cancelTuition(tuitionId);
      await loadTuitions();
      errorAlert('Éxito', 'Matrícula cancelada correctamente', 'success');
    } catch (error) {
      errorAlert('Error', 'No se pudo cancelar la matrícula', 'error');
    }
  };

  // Función para comparar nombres normalizados
  const normalizeName = name =>
    name && name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

  // Filtrar tuitions por comparación de nombre de course y subject
  const filteredTuitions = tuitions.filter(tuition => {
    if (!tuition.course || !tuition.subject) return false;
    return normalizeName(tuition.course.name) === normalizeName(tuition.subject.name);
  });

  return (
    <div className="tuitions-container">
      <h3>Matrículas Activas</h3>
      {filteredTuitions.length === 0 ? (
        <p className="no-tuitions">No hay matrículas activas</p>
      ) : (
        <div className="tuitions-grid">
          {filteredTuitions.map((tuition) => (
            <div key={tuition.id} className="tuition-card">
              <h4>{tuition.course.name}</h4>
              <p>Fecha: {new Date(tuition.inscriptionDate).toLocaleDateString()}</p>
              {isAdmin && <p>Estudiante: {tuition.student.user?.name}</p>}
              <button 
                className="cancel-button"
                onClick={() => handleCancelTuition(tuition.id)}
              >
                Cancelar Matrícula
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Si tu lógica de getTuitions ya retorna los grades con subject y course, no necesitas cambiar nada aquí.
// Si no, deberías actualizar getTuitions en tu tuitionService para que consulte los grades del estudiante.

export default TuitionList;
