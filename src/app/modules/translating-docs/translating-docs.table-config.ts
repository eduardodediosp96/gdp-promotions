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
    };
  },
  dataTable: {
    tableId: 'TRANSLATINGDOCS',
    columns: [
      { header: 'Doc ID', align: 'left', key: 'docId', width: '60', show: true },
      { header: 'Valor', align: 'left', key: 'value', width: '60', show: true },
      { header: 'Creado en', align: 'left', key: 'setDatetime', width: '60', show: false },
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
    showFilters: false,
    showBtnDownload: false,
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
