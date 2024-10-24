"use client";
import React from "react";

const Modal = ({ isOpen, onClose, title, message, isSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2">{message}</p>
        <div className="mt-4 flex justify-center">
          {isSuccess ? (
            <span role="img" aria-label="success" className="text-green-500 text-2xl">✔️</span>
          ) : (
            <span role="img" aria-label="error" className="text-red-500 text-2xl">❌</span>
          )}
        </div>
        <div className="mt-4">
          <button className="bg-blue-500 text-white rounded-full px-4 py-2" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
