import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

private apiUrl = environment.apiUrl + '/admin/dashboard';

  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get<any>(this.apiUrl);
  }
}