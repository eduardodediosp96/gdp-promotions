export enum Actions {
  edit = 'edit',
  activate = 'activate',
  deactivate = 'deactivate',
}

export const config = {
  listActions: () => {
    return {
      create: {
        action: 'edit',
        icon: 'edit',
        color: '#2ca3c4',
        label: 'Usar este Template',
        function: 'handleCreateUsing',
        show: true,
      },
      // active: {
      //   action: 'active',
      //   icon: 'adjust',
      //   color: '#ed4955',
      //   label: 'Activar',
      //   function: 'handleActive',
      //   show: true,
      // },
      // deactive: {
      //   action: 'deactive',
      //   icon: 'adjust',
      //   color: '#5dcb94',
      //   label: 'Desactivar',
      //   function: 'handleDeactive',
      //   show: true,
      // },
    };
  },
  dataTable: {
    tableId: 'template',
    columns: [
      { header: 'codeStr', align: 'left', key: 'codeStr', width: '100', show: true },
      { header: 'ID', align: 'left', key: 'templateId', width: '80', show: false },
      { header: 'Nombre', align: 'left', key: 'name', width: '260', show: true },
      { header: 'Moneda', align: 'left', key: 'currencyId', width: '100', show: true },
      { header: 'Tipo', align: 'left', key: 'currencyId', width: '100', show: false },
      { header: 'Usuarios habilitados', align: 'left', key: 'enableUsers', width: '180', show: false },
      { header: 'Factor de Redistribucion', align: 'left', key: 'restFactor', width: '80', show: false },
      { header: 'Plataformas', align: 'left', key: 'platforms', width: '180', show: false },
      { header: 'Processors', align: 'left', key: 'processors', width: '180', show: true },
      { header: 'Eventos', align: 'left', key: 'events', width: '180', show: true },
      // { header: 'TESTING', align: 'left', key: 'testing', width: '80', show: true },
      // { header: 'Creado por', align: 'right', key: 'insUserId', width: '80', show: false },
      // { header: 'Creado en', align: 'left', key: 'insDatetime', width: '120', show: false },
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
