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
      copy: {
        action: 'copy',
        icon: 'content_copy',
        color: '#2ca3c4',
        label: 'Copiar',
        function: 'handleCopy',
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
    tableId: 'promotion',
    columns: [
      { header: 'Code', align: 'left', key: 'code', width: '120', show: true },
      { header: 'Promo Type', align: 'left', key: 'promoType', width: '120', show: true },
      // { header: 'Type', align: 'left', key: 'typeId', width: '100', show: true },
      { header: 'Currency Id', align: 'left', key: 'currencyId', width: '200', show: true },
      { header: 'Promotion Id', align: 'left', key: 'promotionId', width: '200', show: true },
      { header: 'Life Start', align: 'left', key: 'lifeStart', width: '100', show: true },
      { header: 'Life End', align: 'left', key: 'lifeEnd', width: '100', show: true },
      { header: 'Set User', align: 'left', key: 'setUserId', width: '200', show: true },
      { header: 'Set Date', align: 'left', key: 'setDate', width: '200', show: true },
      { header: 'Time', align: 'left', key: 'setDatetime', width: '200', show: true },
      { header: 'Bonus', align: 'left', key: 'bonus', width: '200', show: true },
      { header: 'Depositor Type', align: 'left', key: 'depositorType', width: '200', show: true },
      { header: 'Frequency', align: 'left', key: 'frequency', width: '100', show: true },
      { header: 'Platforms', align: 'left', key: 'platforms', width: '120', show: true },
      { header: 'Processors', align: 'left', key: 'processors', width: '120', show: true },
      { header: 'Tags', align: 'left', key: 'tags', width: '120', show: true },
      { header: 'Events', align: 'left', key: 'events', width: '120', show: true },
      { header: 'Description', align: 'left', key: 'description', width: '200', show: true },
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
