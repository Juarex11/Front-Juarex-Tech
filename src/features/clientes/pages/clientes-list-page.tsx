import { useEffect, useState } from 'react';
import type { Cliente } from '@/features/clientes/types/cliente';
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
  restoreCliente,
} from '@/features/clientes/services/cliente-service';
import { ClienteTable } from '../components/cliente-table';
import { ClienteFormModal } from '../components/cliente-form-modal';

export function ClientesListPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados para el Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  const fetchClientes = async (searchTerm = '') => {
    setLoading(true);
    try {
      const response = await getClientes(searchTerm);
      setClientes(response.data || response || []);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes(search);
  }, [search]);

  // Abrir modal para crear
  const handleOpenCreate = () => {
    setSelectedCliente(null);
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const handleOpenEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  // Guardar (Crear o Editar)
  const handleSubmitForm = async (formData: Omit<Cliente, 'id'>) => {
    if (selectedCliente?.id) {
      await updateCliente(selectedCliente.id, formData);
    } else {
      await createCliente(formData);
    }
    fetchClientes(search);
  };

  const handleDelete = async (id: number | string) => {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      try {
        await deleteCliente(id);
        fetchClientes(search);
      } catch (error) {
        console.error('Error al eliminar cliente:', error);
      }
    }
  };

  const handleRestore = async (id: number | string) => {
    try {
      await restoreCliente(id);
      fetchClientes(search);
    } catch (error) {
      console.error('Error al restaurar cliente:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Clientes</h1>
          <p className="text-sm text-gray-500">
            Administra la lista de clientes del sistema.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          + Nuevo Cliente
        </button>
      </div>

      <div className="max-w-md">
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Cargando clientes...</div>
      ) : (
        <ClienteTable
          clientes={clientes}
          onView={(cliente) => alert(`Detalles del cliente:\nID: ${cliente.id}\nNombre: ${cliente.nombre}\nEmail: ${cliente.email}\nTeléfono: ${cliente.telefono || 'Sin teléfono'}`)}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          onRestore={handleRestore}
        />
      )}

      {/* Modal Reutilizable */}
      <ClienteFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={selectedCliente}
        title={selectedCliente ? 'Editar Cliente' : 'Nuevo Cliente'}
      />
    </div>
  );
}