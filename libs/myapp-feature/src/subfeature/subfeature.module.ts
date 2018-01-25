import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubfeatureComponent } from './subfeature.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userinfoReducer } from './+state/userinfo.reducer';
import { userinfoInitialState } from './+state/userinfo.init';
import { UserinfoEffects } from './+state/userinfo.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('userinfo', userinfoReducer, { initialState: userinfoInitialState }),
    EffectsModule.forFeature([UserinfoEffects])
  ],
  declarations: [SubfeatureComponent],
  providers: [UserinfoEffects]
})
export class SubfeatureModule {}
