import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProcessService } from "src/app/shared/services/process.service";
import * as fromRecentRecordsActions from "./recent-records.actions";
import { exhaustMap, switchMap, catchError, tap, delay } from "rxjs/operators";
import { of } from "rxjs";
import { NewProccessService } from "src/app/shared/services/new-process.service";
import { ToastService } from "src/app/shared/services/toast.service";

@Injectable()
export class RecentRecordsEffects {
  constructor(
    private action$: Actions,
    private processService: ProcessService,
    private newProcess: NewProccessService,
    private toast: ToastService
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

  createNewProcess = createEffect(() =>
    this.action$.pipe(
      ofType(fromRecentRecordsActions.recentRecordsCreateNewProcess),
      tap((o) =>
        this.toast.presentToastMessageWarning("Creando nuevo proceso")
      ),
      delay(2000),
      exhaustMap((action) =>
        this.newProcess.newProcess().pipe(
          switchMap((res) => {
            localStorage.setItem("processId", res.processId);
            this.toast.presentToastSuccess();
            return [
              fromRecentRecordsActions.recentRecordsCreateProcessSuccess(),
              fromRecentRecordsActions.recentRecordsLoadTypeRegister({
                isNewRegister: false,
                path: "/process/recent-records",
              }),
            ];
          })
        )
      )
    )
  );
}
