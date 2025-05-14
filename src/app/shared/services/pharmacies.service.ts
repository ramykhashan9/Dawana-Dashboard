import { Injectable } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PharmaciesService {

  constructor(private http: HttpClient, private config: Config) { }
  HostUrl = this.config.ApiUrl + "dawana-service/api/v1/dashboard"

  getAllPharmacies(form: any, skip: number = 0, take: number = 10) {
    return this.http.post<any>(`${this.HostUrl}/get-all-pharmacies/${skip}/${take}`, form);
  }
  acceptRejectPharmacy(pharmacyId: number, status: string) {
    return this.http.post<any>(`${this.HostUrl}/accept-reject-pharmacy`, {
      "status": status,
      "pharmacy_id": pharmacyId
    });
  }
  assignToInspector(inspectorId: number, pharmacyID: number) {
    return this.http.post<any>(`${this.HostUrl}/assign-pharmacy-to-inspector`, {

      "pharmacy_id": pharmacyID,
      "inspector_id": inspectorId


    });
  }
  uploadDispenseLetter(pharmacyId: number, dispenseLetter: string, documnetExipry: string) {
    return this.http.post<any>(`${this.HostUrl}/upload-dispenseLetter`, {
      "pharmacy_id": pharmacyId,
      "dispense_letter": dispenseLetter,
      "document_expiry": documnetExipry
    });
  }

  pharmacySearchByName(name: string) {
    return this.http.post<any>(`${this.config.ApiUrl}dawana-service/api/v1/pharmacy/search-by-name`, {
      "name": name,
    });
  }
}

