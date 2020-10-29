import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { reprocesingOfGrinding, ReprocessingOfProcess } from "../models/reprocessing.interface";
import { ReprocessingToProcess } from "../models/reprocessingToProcess.interface";

@Injectable({ providedIn: "root" })
export class ReprocessingService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}`;
  }

  getListReprocessing(processId:number) {
    return this.http.get<ReprocessingOfProcess[]>(`${this.url}/process/reprocesing/${processId}`);
  }

  registerReprocessing(reprocessing: ReprocessingToProcess[]): Observable<any> {
    return this.http.post<any>(`${this.url}/process-reprocesing`, reprocessing);
  }

  getListAllReprocesings(){
    return this.http.get<ReprocessingOfProcess[]>(`${this.url}/process-reprocesing/getall`);
  }

  getListReprocesingsVinculatedProcess(processId:number){
    return this.http.get<ReprocessingOfProcess[]>(`${this.endpoint}/process/reprocesing-vinculated/${processId}`)
  }

  setListReprocesingVinculatedProcess(processId:number,reprocesingsIds:Array<number>){
    return this.http.put(`${this.endpoint}/process/grinding-reprocesing/${processId}`,reprocesingsIds)
  }

  setGrindingReprocesing(reprocesings:reprocesingOfGrinding[]){
    return this.http.post(`${this.endpoint}/process/use-reprocesing`,reprocesings)
  }
}
