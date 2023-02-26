export function isRequired(message = 'Field required!') {
  return (value) => !!value || message
}

export function isEmail(message = 'Email not valid!') {
  return (value) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || message
}

export function isValid(fn, message = 'Value not valid!') {
  return (value) => fn(value) || message
}

export function isCharactersLimit(
  min,
  max,
  message = 'Characters length not valid!'
) {
  return (value) => (value.length >= min && vale.length <= max) || message
}
