// Lightweight form state + client-side validation + submit guarding.
// `validate(values)` returns an errors object ({} when valid). `onSubmit` is
// only called when valid; `submitting` stays true for the duration so callers
// can disable the submit button (prevents double-submit).
//
//   const form = useForm({ initial, validate });
//   <Input value={form.values.title} onChange={form.handleChange('title')} />
//   <Button disabled={form.submitting} onClick={() => form.handleSubmit(doCreate)}>

import React from 'react';

export function useForm<T extends Record<string, any> = Record<string, any>>(
  { initial = {} as T, validate }: { initial?: T; validate?: (values: T) => Record<string, string> | undefined } = {},
) {
  const [values, setValues] = React.useState<T>(initial);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = React.useState(false);

  const setValue = React.useCallback((name: string, value: any) => {
    setValues((v) => ({ ...v, [name]: value }));
  }, []);

  // Works with DS inputs that emit either an event or a raw value.
  const handleChange = React.useCallback(
    (name: string) => (eOrValue: any) => {
      const value =
        eOrValue && eOrValue.target !== undefined ? eOrValue.target.value : eOrValue;
      setValue(name, value);
    },
    [setValue],
  );

  const runValidation = React.useCallback(
    (vals: T): Record<string, string> => (validate ? validate(vals) || {} : {}),
    [validate],
  );

  const validateForm = React.useCallback(() => {
    const next = runValidation(values);
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [runValidation, values]);

  const handleSubmit = React.useCallback(
    async (onSubmit: (values: T) => any) => {
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

  const reset = React.useCallback((next: T = initial) => {
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
