import React, { useEffect } from 'react';

const Alert = ({ msg, color, alertItems, removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alertItems]);

  return <p className={`alert alert-${color}`}>{msg}</p>;
};

export default Alert;
