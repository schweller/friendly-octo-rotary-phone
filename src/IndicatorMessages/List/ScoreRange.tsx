import React from 'react';
import { useField } from 'formik';

const ScoreRange: React.FC<{name: string}> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "range" });

  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="range" />
        {children}
      </label>
      {meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default ScoreRange;
