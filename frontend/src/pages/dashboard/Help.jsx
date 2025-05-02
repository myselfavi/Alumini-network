function Help() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Help Center</h1>
                <p className="text-gray-600 mb-6">
                    We're here to assist you! Feel free to explore the resources or reach out to us for support.
                </p>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Email: <a href="mailto:support@alumni-network.com" className="text-indigo-600 hover:underline">support@alumni-network.com</a></li>
                        <li>Phone: <a href="tel:+1234567890" className="text-indigo-600 hover:underline">+1 (234) 567-890</a></li>
                        <li>Office Hours: Monday to Friday, 9:00 AM - 5:00 PM</li>
                        <li>Address: 123 Alumni Network Street, City, Country</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Help;