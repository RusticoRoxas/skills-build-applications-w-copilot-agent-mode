const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export async function fetchCollection(endpoint) {
  const response = await fetch(endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Unable to load ${endpoint} (${response.status})`);
  }

  const payload = await response.json();
  return Array.isArray(payload) ? payload : payload.results || payload.data || [];
}
