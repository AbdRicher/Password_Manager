'use client';
import React, { useEffect, useRef } from 'react';

export default function CustomAlert({ message, type = 'error', visible, onClose }) {
  const hasClosedRef = useRef(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        if (!hasClosedRef.current) {
          onClose(); // Auto close only if not manually closed
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  const handleClose = () => {
    hasClosedRef.current = true;
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40 transition-opacity">
      <div
        className={`rounded-xl px-6 py-5 text-white shadow-2xl transform transition-transform duration-300 scale-100 w-[90%] max-w-md text-center
          ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}
      >
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={handleClose}
          className="bg-white text-black px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
}
