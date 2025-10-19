import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((msg, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    // First remove any existing toasts with the same message to prevent duplicates
    setToasts(prev => {
      const filtered = prev.filter(t => t.msg !== msg);
      return [...filtered, { id, msg, type: opts.type || 'info', duration: opts.duration || 3000 }];
    });
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), opts.duration || 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed z-50 top-4 right-4 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded shadow text-sm font-medium text-white transition-all
              ${t.type === 'success' ? 'bg-green-600' : t.type === 'error' ? 'bg-red-600' : 'bg-neutral-800'}`}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
