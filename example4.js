// Un monoide para acumular errores de validación

const Validation = {
  empty: () => ({
    isValid: true,
    errors: []
  }),

  concat: (a, b) => ({
    isValid: a.isValid && b.isValid,
    errors: [...a.errors, ...b.errors]
  })
};

const createValidator = (predicate, errorMsg) => (value) => {
  if (predicate(value)) return Validation.empty();
  return { isValid: false, errors: [errorMsg] };
};

const validateEmail = createValidator(
  (email) => email.includes('@'),
  'El email debe contener @'
);

const validateLength = createValidator(
  (str) => str.length >= 3,
  'Debe tener al menos 3 caracteres'
);

const validateNotEmpty = createValidator(
  (str) => str.trim().length > 0,
  'No puede estar vacío'
);

const testEmail = 'usuario';
const validations = [
  validateEmail(testEmail),
  validateLength(testEmail),
  validateNotEmpty(testEmail)
];

const validate = (monoid) => (values) => {
  if (values.length === 0) return monoid.empty();
  return values.reduce((acc, val) => monoid.concat(acc, val))
}

const result = validate(Validation)(validations);
console.log('Resultado de validación:', result);
