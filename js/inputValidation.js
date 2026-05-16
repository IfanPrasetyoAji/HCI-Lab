function isLetter(ch) {
  const code = ch.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function isDigit(ch) {
  const code = ch.charCodeAt(0);
  return code >= 48 && code <= 57;
}

function onlyLettersAndSpaces(str) {
  for (let i = 0; i < str.length; i++) {
    if (!isLetter(str[i]) && str[i] !== ' ') return false;
  }
  return true;
}

function extractDigits(str) {
  let out = '';
  for (let i = 0; i < str.length; i++) {
    if (isDigit(str[i])) out += str[i];
  }
  return out;
}

function isValidEmail(str) {
  let atIndex = -1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '@') {
      if (atIndex !== -1) return false;
      atIndex = i;
    }
    if (str[i] === ' ') return false;
  }
  if (atIndex < 1 || atIndex === str.length - 1) return false;
  let dotAfterAt = false;
  for (let i = atIndex + 1; i < str.length - 1; i++) {
    if (str[i] === '.') { dotAfterAt = true; break; }
  }
  return dotAfterAt;
}

const validators = {
  fullName(value) {
    const v = value.trim();
    if (!v) return 'Full name is required.';
    if (v.length < 3) return 'Full name must be at least 3 characters.';
    if (!onlyLettersAndSpaces(v)) return 'Full name must only contain letters and spaces.';
    return '';
  },

  email(value) {
    const v = value.trim();
    if (!v) return 'Email is required.';
    if (!isValidEmail(v)) return 'Enter a valid email address.';
    return '';
  },

  phone(value) {
    const digits = extractDigits(value);
    if (!digits) return 'Phone number is required.';
    if (digits.length < 10 || digits.length > 15) return 'Phone number must be 10–15 digits.';
    return '';
  },

  address(value) {
    if (!value.trim()) return 'Shipping address is required.';
    if (value.trim().length < 10) return 'Address must be at least 10 characters.';
    return '';
  },

  payment(value) {
    if (!value) return 'Select a payment method.';
    return '';
  },
};

function validateField(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  let value, validator;

  if (fieldId === 'payment') {
    const selected = document.querySelector('input[name="payment"]:checked');
    value = selected ? selected.value : '';
    validator = validators.payment;
  } else {
    value = field.value;
    validator = validators[fieldId];
  }

  const msg = validator(value);
  error.textContent = msg;
  error.classList.toggle('visible', !!msg);
  if (field) field.classList.toggle('invalid', !!msg);
  return !msg;
}

function validateForm() {
  const results = [
    validateField('fullName', 'fullNameError'),
    validateField('email', 'emailError'),
    validateField('phone', 'phoneError'),
    validateField('address', 'addressError'),
    validateField('payment', 'paymentError'),
  ];
  return results.every(Boolean);
}

function clearFormErrors() {
  document.querySelectorAll('.form-error').forEach(el => {
    el.textContent = '';
    el.classList.remove('visible');
  });
  document.querySelectorAll('.invalid').forEach(el => {
    el.classList.remove('invalid');
  });
}
