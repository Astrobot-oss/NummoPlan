export function loadData(key, defaultValue = []) {
  try {
    const data = localStorage.getItem(key);

    if (!data) return defaultValue;

    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

export function saveData(key, value) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}