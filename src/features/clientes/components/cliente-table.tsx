import type { Cliente } from '@/features/clientes/types/cliente';

interface ClienteTableProps {
  clientes: Cliente[];
  onView: (cliente: Cliente) => void;
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: number | string) => void;
  onRestore: (id: number | string) => void;
}

export function ClienteTable({
  clientes,
  onView,
  onEdit,
  onDelete,
  onRestore,
}: ClienteTableProps) {
  if (clientes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No se encontraron clientes registrados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Teléfono</th>
            <th className="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{cliente.id}</td>
              <td className="px-6 py-4">{cliente.nombre}</td>
              <td className="px-6 py-4">{cliente.email}</td>
              <td className="px-6 py-4">{cliente.telefono || '-'}</td>
              <td className="px-6 py-4 text-center space-x-2">
                <button
                  onClick={() => onView(cliente)}
                  className="px-2 py-1 text-xs font-medium text-blue-600 hover:underline"
                >
                  Ver
                </button>
                <button
                  onClick={() => onEdit(cliente)}
                  className="px-2 py-1 text-xs font-medium text-amber-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => cliente.id && onDelete(cliente.id)}
                  className="px-2 py-1 text-xs font-medium text-red-600 hover:underline"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => cliente.id && onRestore(cliente.id)}
                  className="px-2 py-1 text-xs font-medium text-emerald-600 hover:underline"
                >
                  Restaurar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}