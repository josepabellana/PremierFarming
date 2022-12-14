export const toTones = num => {
    if (num > 1000) return `${num / 1000} tonnes`;
    else return `${num} kilograms`;
  };