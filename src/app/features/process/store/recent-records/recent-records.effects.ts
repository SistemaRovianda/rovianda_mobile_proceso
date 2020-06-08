import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProcessService } from "src/app/shared/services/process.service";
import * as fromRecentRecordsActions from "./recent-records.actions";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class RecentRecordsEffects {
  constructor(
    private action$: Actions,
    private processService: ProcessService
  ) {}

  loadRecentRecords = createEffect(() =>
    this.action$.pipe(
      ofType(fromRecentRecordsActions.recentRecordsStartLoad),
      exhaustMap((action) =>
        this.processService.getProcess(action.status).pipe(
          switchMap((process) => [
            fromRecentRecordsActions.recentRecordsLoadRecords({ process }),
            fromRecentRecordsActions.recentRecordsLoadRecordsSuccess(),
          ]),
          catchError((error) =>
            of(fromRecentRecordsActions.recentRecordsLoadFailure({ error }))
          )
        )
      )
    )
  );
}
