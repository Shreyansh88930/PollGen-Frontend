import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Mic,
  Brain,
  Users,
  Trophy,
  FileText,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/host', icon: Home, label: 'Dashboard' },
    { path: '/host/audio', icon: Mic, label: 'Audio Capture' },
    { path: '/host/ai-questions', icon: Brain, label: 'AI Questions' },
    { path: '/host/participants', icon: Users, label: 'Participants' },
    { path: '/host/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/host/reports', icon: FileText, label: 'Reports' },
    { path: '/host/settings', icon: Settings, label: 'Settings' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg text-white"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: isMobileMenuOpen ? 0 : -100,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className={`
          fixed left-0 top-0 h-full w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 z-40
          lg:translate-x-0 lg:opacity-100 lg:static lg:z-auto
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 lg:p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3 mb-6 lg:mb-8"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base lg:text-lg">Poll System</h1>
              <p className="text-gray-400 text-xs lg:text-sm">AI-Powered</p>
            </div>
          </motion.div>

          <nav className="space-y-1 lg:space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <NavLink
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                    <span className="font-medium text-sm lg:text-base">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-2 h-2 bg-primary-400 rounded-full"
                      />
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6">
          <button
            onClick={() => {
              logout();
              closeMobileMenu();
            }}
            className="flex items-center space-x-3 px-3 py-2 lg:px-4 lg:py-3 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
          >
            <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="font-medium text-sm lg:text-base">Logout</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;