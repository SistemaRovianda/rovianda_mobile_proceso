import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { LotMeatOutput } from "../models/Lot-meat-output.interface";
import { Observable } from "rxjs";
import { FormulationDetails, FormulationPending } from '../models/formulations.interface';

@Injectable({ providedIn: "root" })
export class FormulationService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}`;
  }

  getFormulationsByProductRoviandaId(
    productRoviandaId: number
  ): Observable<FormulationPending[]> {
    return this.http.get<FormulationPending[]>(
      `${this.url}/formulation/product-rovianda/${productRoviandaId}`
    );
  }

  getFormulationsDetails(
    formulationId: number
  ): Observable<FormulationDetails> {
    return this.http.get<FormulationDetails>(
      `${this.url}/formulation-details/${formulationId}`
    );
  }
}
