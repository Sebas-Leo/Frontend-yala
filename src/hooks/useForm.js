// Lightweight form state + client-side validation + submit guarding.
// `validate(values)` returns an errors object ({} when valid). `onSubmit` is
// only called when valid; `submitting` stays true for the duration so callers
// can disable the submit button (prevents double-submit).
//
//   const form = useForm({ initial, validate });
//   <Input value={form.values.title} onChange={form.handleChange('title')} />
//   <Button disabled={form.submitting} onClick={() => form.handleSubmit(doCreate)}>

import React from 'react';

export function useForm({ initial = {}, validate } = {}) {
  const [values, setValues] = React.useState(initial);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);

  const setValue = React.useCallback((name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
  }, []);

  // Works with DS inputs that emit either an event or a raw value.
  const handleChange = React.useCallback(
    (name) => (eOrValue) => {
      const value =
        eOrValue && eOrValue.target !== undefined ? eOrValue.target.value : eOrValue;
      setValue(name, value);
    },
    [setValue],
  );

  const runValidation = React.useCallback(
    (vals) => (validate ? validate(vals) || {} : {}),
    [validate],
  );

  const validateForm = React.useCallback(() => {
    const next = runValidation(values);
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [runValidation, values]);

  const handleSubmit = React.useCallback(
    async (onSubmit) => {
      const next = runValidation(values);
      setErrors(next);
      setTouched(Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
      if (Object.keys(next).length > 0) return undefined;
      setSubmitting(true);
      try {
        return await onSubmit(values);
      } finally {
        setSubmitting(false);
      }
    },
    [runValidation, values],
  );

  const reset = React.useCallback((next = initial) => {
    setValues(next);
    setErrors({});
    setTouched({});
    setSubmitting(false);
  }, [initial]);

  return {
    values,
    errors,
    touched,
    submitting,
    setValue,
    setValues,
    handleChange,
    validateForm,
    handleSubmit,
    reset,
  };
}
