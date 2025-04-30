import React, { useEffect, useState } from 'react';
import { Circle, Briefcase, Building2, Phone, Mail, X, Calendar, MapPin } from 'lucide-react';
import useApi from '../../hooks/useApi';

function AlumniNetworkCard({ alumni, onClick }) {
  const nameInitials = alumni.name.split(' ').map((name) => name[0]).join('');
  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={() => onClick(alumni)}
    >
      <div className="flex items-center p-4">
        <div className="w-24 h-24 mr-4 rounded-full bg-gray-200 p-4 flex items-center justify-center">
          <Circle className="w-full h-full text-gray-600">
            <span className="text-3xl">{nameInitials}</span>
          </Circle>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl">{alumni.name}</h2>
          <p className="text-base flex items-center">
            <Building2 className="w-6 h-6 mr-2" />
            <span className="mr-2">{alumni.organization}</span>
          </p>
          <p className="text-base flex items-center">
            <Briefcase className="w-6 h-6 mr-2" />
            <span className="mr-2">{alumni.workExperience} years+</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function AlumniNetwork() {
  const [alumniList, setAlumniList] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useApi();
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await api.get('/api/users/all?type=alumni');
        setAlumniList(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4 relative">
      <div
        className={`absolute inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-md ${
          selectedAlumni ? 'flex' : 'hidden'
        }`}
      >
        <div
          className="bg-white shadow-md rounded-lg overflow-hidden p-8 m-auto w-2/3 relative"
          style={{ maxHeight: 'calc(100vh - 2rem)', overflowY: 'auto' }}
        >
          <button onClick={() => setSelectedAlumni(null)} className="absolute top-0 right-0 p-4">
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl">{selectedAlumni?.name}</h2>
          <p className="text-base flex items-center">
            <Phone className="w-6 h-6 mr-2" />
            <span className="mr-2">{selectedAlumni?.phone}</span>
          </p>
          <p className="text-base flex items-center">
            <Mail className="w-6 h-6 mr-2" />
            <span className="mr-2">{selectedAlumni?.email}</span>
          </p>
          <p className="text-base flex items-center">
            <Calendar className="w-6 h-6 mr-2" />
            <span className="mr-2">Graduated: {selectedAlumni?.graduationYear}</span>
          </p>
          <p className="text-base flex items-center">
            <MapPin className="w-6 h-6 mr-2" />
            <span className="mr-2">Location: {selectedAlumni?.location}</span>
          </p>
        </div>
      </div>
      {alumniList.map((alumni) => (
        <AlumniNetworkCard
          key={alumni.id}
          alumni={alumni}
          onClick={(alumni) => setSelectedAlumni(alumni)}
        />
      ))}
    </div>
  );
}

export default AlumniNetwork;

