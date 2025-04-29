import {useNavigate, Link} from "react-router-dom";
import {UserPlus, GraduationCap, Briefcase, ArrowLeft} from 'lucide-react';

const SignupPage = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-600 p-1 hover:text-gray-900 flex items-center gap-1"
                >
                    <ArrowLeft className="w-5 h-5"/>
                    <span>Back</span>
                </button>
                <div className="text-center mt-2 mb-8">
                    <UserPlus className="w-12 h-12 text-indigo-600 mx-auto mb-4"/>
                    <h2 className="text-3xl font-bold text-gray-800">Choose Account Type</h2>
                    <p className="text-gray-600 mt-2">Select how you want to join Alumni Connect</p>
                </div>

                <div className="space-y-4">
                    <Link
                        to="/signup/student"
                        className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 transition-colors"
                    >
                        <GraduationCap className="w-8 h-8 text-indigo-600"/>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">Student</h3>
                            <p className="text-gray-600">Current student looking to connect</p>
                        </div>
                    </Link>

                    <Link
                        to="/signup/alumni"
                        className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 transition-colors"
                    >
                        <Briefcase className="w-8 h-8 text-indigo-600"/>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">Alumni</h3>
                            <p className="text-gray-600">Former student wanting to give back</p>
                        </div>
                    </Link>
                </div>

                <p className="text-center mt-8">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-800">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;