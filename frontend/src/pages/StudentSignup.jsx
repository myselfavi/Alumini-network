import { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Hash, Lock, ArrowLeft } from 'lucide-react';
import { useAuthContext } from '../contexts/useAuthContext';

const initialState = {
  name: '',
  email: '',
  phone: '',
  rollNumber: '',
  password: '',
  error: '',
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PHONE':
      return { ...state, phone: action.payload };
    case 'SET_ROLL_NUMBER':
      return { ...state, rollNumber: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      throw new Error();
  }
};

const StudentSignup = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { register } = useAuthContext();

  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_ERROR', payload: '' });
    dispatch({ type: 'SET_IS_LOADING', payload: true });

    try {
      const user = {
        type: 'student',
        name: state.name,
        email: state.email,
        phone: state.phone,
        rollNumber: state.rollNumber,
        password: state.password
      }
      await register(user);
      navigate('/dashboard');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_IS_LOADING', payload: false });
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        dispatch({ type: 'SET_NAME', payload: value });
        break;
      case 'email':
        dispatch({ type: 'SET_EMAIL', payload: value });
        break;
      case 'phone':
        dispatch({ type: 'SET_PHONE', payload: value });
        break;
      case 'rollNumber':
        dispatch({ type: 'SET_ROLL_NUMBER', payload: value });
        break;
      case 'password':
        dispatch({ type: 'SET_PASSWORD', payload: value });
        break;
      default:
        throw new Error();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 p-1 hover:text-gray-900 flex items-center gap-1"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Student Sign Up</h2>
        {state.error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
            {state.error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                value={state.phone}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Roll Number</label>
            <div className="relative">
              <Hash className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="rollNumber"
                value={state.rollNumber}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your roll number"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={state.isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {state.isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentSignup;