import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { UserinfoState } from './userinfo.interfaces';
import { LoadData, DataLoaded } from './userinfo.actions';

@Injectable()
export class UserinfoEffects {
  @Effect()
  loadData = this.dataPersistence.fetch('LOAD_DATA', {
    run: (action: LoadData, state: UserinfoState) => {
      return {
        type: 'DATA_LOADED',
        payload: {}
      };
    },

    onError: (action: LoadData, error) => {
      console.error('Error', error);
    }
  });

  constructor(private actions: Actions, private dataPersistence: DataPersistence<UserinfoState>) {}
}
