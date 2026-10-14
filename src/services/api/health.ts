import { apiClient } from './client';

export async function checkApiHealth() {
  const response = await apiClient.get('/health');
  return response.data;
}
