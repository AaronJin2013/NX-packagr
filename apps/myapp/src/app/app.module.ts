import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RootComponent } from './root.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';

// import { MyappFeatureModule } from '@nx-example/myapp-feature';
import { MyappFeatureModule } from '@nx-ex/feature';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { rootReducer } from './+state/root.reducer';
import { rootInitialState } from './+state/root.init';
import { RootEffects } from './+state/root.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { ReducerManager } from '@ngrx/store'

@NgModule({
  imports: [
    BrowserModule,
    MyappFeatureModule,
    NxModule.forRoot(),
    RouterModule.forRoot([
    ], { initialNavigation: 'enabled' }),
    StoreModule.forRoot({ root: rootReducer }, { initialState: { root: rootInitialState } }),
    EffectsModule.forRoot([RootEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule,
  ],
  declarations: [AppComponent, RootComponent],
  bootstrap: [AppComponent],
  providers: [RootEffects]
})
export class AppModule {
  constructor() {
    console.log('AppModule');
  }
}
