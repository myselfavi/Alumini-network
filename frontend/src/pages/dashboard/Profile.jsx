import React, { useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';
import { useAuthContext } from "../../contexts/useAuthContext";
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user } = useAuthContext();
  const api = useApi();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get(`/api/user/`);
        console.log(response);
        setProfileData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchProfileData();
  }, []);

  const handleRedirect = () => {
    navigate('/dashboard');
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-700">
        <h1 className="text-white text-2xl">{error.message}</h1>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-700">
        <h1 className="text-white text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="relative max-w-xl mx-auto my-8 p-6 rounded-lg bg-white shadow-lg bg-blue-500">
      <button onClick={handleRedirect} className="absolute top-4 right-4 text-white">
        <X className="w-6 h-6" />
      </button>
      <h1 className="text-3xl font-bold mb-4 text-center text-white">{profileData.name}</h1>
      <div className="space-y-4 text-white">
        <div className="flex justify-center">
          <strong>Email:</strong> {profileData.email}
        </div>
        <div className="flex justify-center">
          <strong>Phone:</strong> {profileData.phone}
        </div>
        <div className="flex justify-center">
          <strong>Organization:</strong> {profileData.organization}
        </div>
        <div className="flex justify-center">
          <strong>Work Experience:</strong> {profileData.workExperience} years
        </div>
        <div className="flex justify-center">
          <strong>Currently:</strong> {profileData.isAlumni ? 'Alumni' : 'Student'}
        </div>
      </div>
    </div>
  );
}

export default Profile;

