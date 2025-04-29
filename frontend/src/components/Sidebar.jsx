import React, { useState } from 'react';
import { Home, MessageSquare, Bell, Briefcase, Users } from 'lucide-react';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const menuItems = [
        { name: 'Home', icon: <Home className="w-5 h-5" /> },
        { name: 'Network', icon: <Users className="w-5 h-5" /> },
        { name: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
        { name: 'Notifications', icon: <Bell className="w-5 h-5" /> },
        { name: 'Jobs', icon: <Briefcase className="w-5 h-5" /> },
    ];

    return (
        <div className="w-64 py-5 h-full bg-white border-r border-gray-200">
            <ul className="space-y-4 p-4">
                {menuItems.map((item) => (
                    <li
                        key={item.name}
                        className={`flex items-center p-2 text-gray-700 rounded transition-colors cursor-pointer ${
                            activeTab === item.name
                                ? 'bg-indigo-100 text-indigo-600'
                                : 'hover:text-indigo-600 hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveTab(item.name)}
                    >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
