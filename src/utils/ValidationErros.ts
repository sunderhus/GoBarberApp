import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErros(errors: ValidationError): Errors {
  const validationErrors: Errors = {};

  errors.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });

  return validationErrors;
}
