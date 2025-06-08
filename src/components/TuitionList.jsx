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

  return (
    <div className="tuitions-container">
      <h3>Matrículas Activas</h3>
      {tuitions.length === 0 ? (
        <p className="no-tuitions">No hay matrículas activas</p>
      ) : (
        <div className="tuitions-grid">
          {tuitions.map((tuition) => (
            <div key={tuition.id} className="tuition-card">
              <h4>{tuition.course.name}</h4>
              <p>Fecha: {new Date(tuition.inscriptionDate).toLocaleDateString()}</p>
              {isAdmin && <p>Estudiante: {tuition.student.name}</p>}
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

export default TuitionList;
