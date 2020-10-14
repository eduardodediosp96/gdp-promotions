export enum Actions {
  edit = 'edit',
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
    tableId: 'COUNTRYIDENT',
    columns: [
      { header: 'PAIS ID', align: 'left', key: 'countryId', width: '80', show: true },
      { header: 'PAIS NOMBRE', align: 'left', key: 'countryName', width: '80', show: true },
      { header: 'IDENTIDAD ID', align: 'left', key: 'identId', width: '80', show: true },
      { header: 'IDENTIDAD NOMBRE', align: 'left', key: 'identName', width: '80', show: true },
      { header: 'SOLO NUMEROS', align: 'left', key: 'onlyDigits', width: '80', show: true },
      { header: 'TAMAÑO MINIMO', align: 'right', key: 'lenMin', width: '80', show: true },
      { header: 'TAMAÑO MAXIMO', align: 'right', key: 'lenMax', width: '80', show: true },
      { header: 'FECHA DE CREADO', align: 'left', key: 'setDatetime', width: '80', show: false },
    ],
    indexColumn: true,
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
    showBtnDownload: false,
    showBtnAdd: false,
  },
  onlyDigits: {
    0: {
      value: '0',
      label: 'No',
    },
    1: {
      value: '1',
      label: 'Si',
    },
  },
};
