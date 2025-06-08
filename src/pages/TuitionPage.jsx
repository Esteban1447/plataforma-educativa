import { useState } from 'react';
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import TuitionList from "../components/TuitionList";
import TuitionForm from '../components/TuitionForm';

function TuitionPage() {
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <>
            <MainHeader />
            <main className="tuition-page-container">
                <h1 className="tuition-title">Gestión de Matrículas</h1>
                {userType === 'Student' && (
                    <TuitionForm 
                        studentId={userId}
                        onTuitionCreated={() => setRefreshKey(prev => prev + 1)}
                    />
                )}
                <TuitionList 
                    studentId={userId} 
                    isAdmin={userType === 'Administrator'}
                    key={refreshKey}
                />
            </main>
            <Footer />
        </>
    );
}

export default TuitionPage;
