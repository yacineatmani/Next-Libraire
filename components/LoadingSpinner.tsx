'use client';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200/70 dark:bg-gray-900/70 z-50">
      <svg className="w-16 h-16 animate-spin text-blue-600" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-20" />
        <path fill="none" stroke="currentColor" strokeWidth="4" d="M4 12a8 8 0 018-8" className="opacity-80" />
      </svg>
      <span className="ml-4 text-lg font-medium text-gray-800 dark:text-gray-200">Chargement...</span>
    </div>
  );
}