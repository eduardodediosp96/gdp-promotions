export enum Actions {
  edit = 'edit',
  activate = 'activate',
  deactivate = 'deactivate',
}

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
      active: {
        action: 'active',
        icon: 'adjust',
        color: '#ed4955',
        label: 'Activar',
        function: 'handleActive',
        show: true,
      },
      deactive: {
        action: 'deactive',
        icon: 'adjust',
        color: '#5dcb94',
        label: 'Desactivar',
        function: 'handleDeactive',
        show: true,
      },
    };
  },
  dataTable: {
    tableId: 'KEYS',
    columns: [
      { header: 'Key ID', align: 'left', key: 'keyId', width: '60', show: true },
      { header: 'Descripcion', align: 'left', key: 'description', width: '160', show: true },
      { header: 'Activo', align: 'left', key: 'active', width: '60', show: true },
      { header: 'testing', align: 'left', key: 'testing', width: '60', show: true },
      { header: 'insDatetime', align: 'left', key: 'insDatetime', width: '160', show: false },
    ],
    indexColumn: false,
    actionColumn: true,
    pageSizeOptions: [10, 20, 50, 100],
    pageSizeDefault: 10,
    listStatus: [
      { key: '1', label: 'Activos' },
      { key: '0', label: 'Inactivos' },
      { key: '-1', label: 'Todos' },
    ],
    statusSelected: '-1',
    showStatus: false,
    // filtersAllowed: [ // informacion brindada por el endpoint
    //   { key: 'active', label: 'Active' }
    // ],
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
    }
  },
};
