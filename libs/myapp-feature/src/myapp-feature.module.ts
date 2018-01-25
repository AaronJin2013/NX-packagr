import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SubfeatureModule } from "./subfeature/subfeature.module";
import { SubfeatureComponent } from "./subfeature/subfeature.component";
export const myappFeatureRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{
    path: '',
    component: SubfeatureComponent
  }]), SubfeatureModule]
})
export class MyappFeatureModule {
  constructor() {
    console.log('MyappFeatureModule');
  }
}
