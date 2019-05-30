import { Component, ViewChild } from '@angular/core';
import { Platform, IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private pageTitle: string;
  public tabsList: any[] = [{
    name: 'tab1',
    title: 'About',
    label: 'About',
    icon: 'boat'
    }, {
    name: 'tab2',
    title: 'Import a new photo',
    label: 'Camera',
    icon: 'camera'
    }, {
    name: 'tab3',
    title: 'My account',
    label: 'Settings',
    icon: 'settings'
  }];
  @ViewChild(IonTabs) public tabs: IonTabs;

  constructor(private platform: Platform) { }

  /**
   * Check if the device is a mobile
   * Change the layout if the app is running on a desktop
   */
  isMobile(): boolean {
    return this.platform.is('mobile') ? true : false;
  }

  /**
   * Set the titles and the tabs dynamically
   */
  setTitle() {
    const currentTab: string = this.tabs.getSelected();
    const matchingTab = this.tabsList.filter((tab: any) => tab.name === currentTab)[0]; //uses the first array element as the currentTab
    this.pageTitle = matchingTab.title;
  }
}
