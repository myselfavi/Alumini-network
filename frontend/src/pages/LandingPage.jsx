import {useNavigate} from 'react-router-dom';
import {GraduationCap} from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center text-center px-4">
      <GraduationCap className="w-20 h-20 text-indigo-600 mb-8" />
      <h1 className="text-6xl font-bold text-indigo-900 mb-6">
        Alumni Connect
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl">
        Bridging the gap between past and present. Connect with your college community and build lasting relationships.
      </p>
      <button
        onClick={() => navigate('/login')}
        className="px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold 
                 hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 
                 shadow-lg hover:shadow-xl"
      >
        Welcome to Alumni Network
      </button>
    </div>
  );
};

export default LandingPage;