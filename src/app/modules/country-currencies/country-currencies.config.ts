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
    tableId: 'COUNTRYCURRENCY',
    columns: [
      { header: 'PAIS ID', align: 'left', key: 'countryId', width: '80', show: true },
      { header: 'PAIS NOMBRE', align: 'left', key: 'countryName', width: '160', show: true },
      { header: 'MONEDA ID', align: 'left', key: 'currencyId', width: '80', show: true },
      { header: 'MONEDA NOMBRE', align: 'left', key: 'currencyName', width: '80', show: true },
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
};
