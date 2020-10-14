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
      { header: 'ID', align: 'left', key: 'code', width: '80', show: false },
      { header: 'TIPO', align: 'left', key: 'type', width: '160', show: true },
      { header: 'Eventos', align: 'left', key: 'events', width: '160', show: true },
      { header: 'DESCRIPCION', align: 'left', key: 'description', width: '80', show: true },
      { header: 'VALIDO DESDE', align: 'left', key: 'from', width: '80', show: false },
      { header: 'VALIDO HASTA', align: 'left', key: 'to', width: '120', show: false },
      { header: 'CANTIDAD', align: 'left', key: 'quantity', width: '80', show: false },
      { header: 'FREQUENCIA', align: 'left', key: 'frequency', width: '100', show: false },
      { header: 'FACTOR DE REDISTRIBUCION', align: 'restFactor', key: 'identId', width: '120', show: true },
      { header: 'SE APLICA A', align: 'left', key: 'appliesTo', width: '80', show: true },
      { header: 'MONEDA', align: 'left', key: 'currency', width: '80', show: true },
      { header: 'BONUS', align: 'left', key: 'bonus', width: '80', show: true },
      { header: 'LIMITE DE PAGO', align: 'left', key: 'limitPayment', width: '80', show: true },
      { header: 'MONTO INICIAL', align: 'left', key: 'initialAmount', width: '80', show: true },
      { header: 'MONTO FINAL', align: 'left', key: 'finalAmount', width: '80', show: true },
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
