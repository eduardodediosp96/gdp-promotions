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
      name: 'CryptoCoins',
      items: [
        { icon: 'paid', link: '/crypto-coins', label: 'Coins' },
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
