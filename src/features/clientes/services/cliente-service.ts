import { apiClient } from '@/services/api/client';
import type { ApiSuccessResponse } from '@/services/api/types';
import type { Cliente } from '@/features/clientes/types/cliente';

// 1. Listar clientes (GET /clientes)
export async function getClientes(search = '') {
  const response = await apiClient.get<ApiSuccessResponse<Cliente[]>>('/clientes', {
    params: { search }
  });
  return response.data;
}

// 2. Ver un cliente (GET /clientes/{id})
export async function getClienteById(id: number | string) {
  const response = await apiClient.get<ApiSuccessResponse<Cliente>>(`/clientes/${id}`);
  return response.data;
}

// 3. Crear cliente (POST /clientes)
export async function createCliente(clienteData: Omit<Cliente, 'id'>) {
  const response = await apiClient.post<ApiSuccessResponse<Cliente>>('/clientes', clienteData);
  return response.data;
}

// 4. Editar cliente (PUT /clientes/{id})
export async function updateCliente(id: number | string, clienteData: Partial<Cliente>) {
  const response = await apiClient.put<ApiSuccessResponse<Cliente>>(`/clientes/${id}`, clienteData);
  return response.data;
}

// 5. Eliminar cliente (DELETE /clientes/{id})
export async function deleteCliente(id: number | string) {
  const response = await apiClient.delete<ApiSuccessResponse<null>>(`/clientes/${id}`);
  return response.data;
}

// 6. Restaurar cliente (PATCH /clientes/{id}/restore)
export async function restoreCliente(id: number | string) {
  const response = await apiClient.patch<ApiSuccessResponse<Cliente>>(`/clientes/${id}/restore`);
  return response.data;
}