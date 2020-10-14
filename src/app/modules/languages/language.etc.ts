export const config = {
  listActions: () => {
    return {
      edit: {
        action: 'edit',
        icon: 'edit',
        color: '#2ca3c4',
        label: 'Editar',
        function: 'handleEdit',
        show: true,
      },
      deactive: {
        action: 'deactive',
        icon: 'adjust',
        color: 'green',
        label: 'Desactivar',
        function: 'handleDeactive',
        show: true,
      },
      active: {
        action: 'active',
        icon: 'adjust',
        color: 'red',
        label: 'Activar',
        function: 'handleActive',
        show: true,
      },
    };
  },
  dataTable: {
    tableId: 'LANGS',
    columns: [
      { header: 'Lang ID', align: 'left', key: 'langId', width: '60', show: true },
      { header: 'Nombre', align: 'left', key: 'name', width: '120', show: true },
      { header: 'Pais ID', align: 'left', key: 'countryId', width: '60', show: true },
      { header: 'Estado', align: 'left', key: 'active', width: '60', show: false },
      { header: 'Testing', align: 'left', key: 'testing', width: '60', show: true },
      // { header: 'Creado por', align: 'right', key: 'insUserId', width: '60', show: false },
      { header: 'Creado en', align: 'left', key: 'insDatetime', width: '60', show: false },
    ],
    actionColumn: true,
    indexColumn: true,
    pageSizeOptions: [10, 20, 50, 100],
    pageSizeDefault: 10,
    listStatus: [
      { key: '1', label: 'Activos' },
      { key: '0', label: 'Inactivos' },
      { key: '-1', label: 'Todos' },
    ],
    statusSelected: -1,
    showStatus: false,
    filtersAllowed: [
      // informacion brindada por el endpoint
      { key: 'productTypeId', label: 'Product Type ID' },
      { key: 'productTypeIdsIn', label: 'Product Type IDs' },
      { key: 'active', label: 'Active' },
    ],
    filterSelected: '',
    showFilters: true,
    showBtnDownload: true,
    showBtnAdd: true,
  },
  active: {
    '-1': {
      value: '',
      label: 'Todos',
      key: '',
    },
    0: {
      value: '0',
      label: 'Inactivo',
      key: 'active',
    },
    1: {
      value: '1',
      label: 'Activo',
      key: 'active',
    },
  },
  testing: {
    0: {
      value: '0',
      label: 'No',
    },
    1: {
      value: '1',
      label: 'Si',
    },
  },
  filterValues: {
    active: {
      inactivo: '0',
      activo: '1',
    },
    testing: {
      no: '0',
      si: '1',
    },
  },
};
