import React from 'react';
import { Form } from 'react-bootstrap';
import { useField } from 'formik';

const ScoreRange: React.FC<{ name: string }> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'range' });

  const { value } = field;

  return (
    <>
      <label className="range w-100">
        <Form.Control {...field} {...props} type="range" custom />
        <small>
          {children} {value}
        </small>
      </label>
      {meta.error ? (
        <div className="error">
          <small className="text-danger">{meta.error}</small>
        </div>
      ) : null}
    </>
  );
};

export default ScoreRange;
