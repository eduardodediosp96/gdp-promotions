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
    tableId: 'CURRENCY',
    columns: [
      { header: 'ID', align: 'left', key: 'currencyId', width: '80', show: false },
      { header: 'NOMBRE SINGULAR', align: 'left', key: 'nameSingular', width: '160', show: true },
      { header: 'NOMBRE PLURAL', align: 'left', key: 'namePlural', width: '80', show: true },
      { header: 'SIMBOLO', align: 'left', key: 'symbol', width: '80', show: false },
      { header: 'ESTADO', align: 'left', key: 'active', width: '80', show: true },
      { header: 'TESTING', align: 'left', key: 'testing', width: '80', show: true },
      // { header: 'Creado por', align: 'right', key: 'insUserId', width: '80', show: false },
      { header: 'Creado en', align: 'left', key: 'insDatetime', width: '120', show: false },
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
    },
  },
};
