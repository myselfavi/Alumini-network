import React from 'react';
import { Home, MessageSquare, Bell, Briefcase, Users } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const menuItems = [
        { name: 'Home', icon: <Home className="w-5 h-5" />, to: '/dashboard' },
        { name: 'Network', icon: <Users className="w-5 h-5" />, to: '/dashboard/network' },
        { name: 'Messages', icon: <MessageSquare className="w-5 h-5" />, to: '/dashboard/messages' },
        { name: 'Help', icon: <Bell className="w-5 h-5" />, to: '/dashboard/help' },

        // { name: 'Notifications', icon: <Bell className="w-5 h-5" />, to: '/dashboard/notifications' },
        // { name: 'Jobs', icon: <Briefcase className="w-5 h-5" />, to: '/dashboard/jobs' },
    ];

    return (
        <div className="w-64 py-5 px-3 h-full bg-white border-r border-gray-200">
            <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.to}
                        isActive={() => location.pathname.startsWith(item.to)}
                        className={({ isActive }) =>
                            `flex items-center p-2 text-gray-700 rounded transition-colors cursor-pointer ${isActive ? 'bg-indigo-100 text-indigo-600' : 'hover:text-indigo-600 hover:bg-gray-100'}`
                        }
                    >
                        <div className="flex items-center space-x-2">
                            {item.icon}
                            <span className="ml-3">{item.name}</span>
                        </div>
                    </NavLink>
                ))}
            </div>
            
        </div>
    );
};

export default Sidebar;

