function nullable(value) {
  return !!value;

  if (value === '' || value === undefined || value === null) {
    return false;
  } else {
    return true;
  }
}

function spaceControll(value) {
  value = value.trim();
  value = value.replace(/\s+/g, ' ');
  return value;
}

export default {nullable, spaceControll};
