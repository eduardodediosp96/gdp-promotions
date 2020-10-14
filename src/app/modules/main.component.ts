import { Component, OnInit } from '@angular/core';
import { IProject } from '@common/models/project';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  menuGroupListOpened = true;
  sideNavOpened = true;
  menuGroups = [
    {
      menuid: '1',
      name: 'Promociones',
      items: [
        // { icon: 'language', link: '/languages', label: 'Lenguages' },
        // { icon: 'emoji_flags', link: '/country', label: 'Paises' },
        { icon: 'confirmation_number', link: '/promotion', label: 'Promociones' },
        { icon: 'art_track', link: '/template', label: 'Templates' },
        // { icon: 'phone', link: '/calling-codes', label: 'Codigos de llamada' },
        // { icon: 'monetization_on', link: '/currencies', label: 'Monedas' },
        // { icon: 'portrait', link: '/idents', label: 'Identificaciones' },
        // { icon: 'monetization_on', link: '/country-currencies', label: 'Monedas por pais' },
        // { icon: 'article', link: '/country-idents', label: 'Identificacion por pais' },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  menuGroupListOpenedChange(opened: boolean) {
    this.menuGroupListOpened = opened;
  }

  sideNavOpenedChange(opened: boolean) {
    this.sideNavOpened = opened;
  }

  onChangeProjectSelected(project: IProject) {
  }
}
