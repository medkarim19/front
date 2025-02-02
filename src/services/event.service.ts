import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, GLOBAL } from 'src/app/app-config';
import { Observable } from 'rxjs';
import { Evenement } from 'src/models/event';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private baseUrl = 'http://localhost:9000/events';
  
  // tab: enseEvenementignant[] = GLOBAL._DB.events;
  //Injection de HTTP CLIENT
  constructor(private httpClient: HttpClient) {}

  getEvenements(): Observable<Evenement[]>{
    return this.httpClient.get<Evenement[]>(`${this.baseUrl}`);
    //return new Observable((observer) => {observer.next(this.tab)});
  }

  saveEvenement(event: Evenement): Observable<Evenement>{

    return this.httpClient.post<Evenement>(`${this.baseUrl}/create`, event);

    //ken maandekch back-end

    //this.tab.unshift(member);
    //this.tab = [event, ...this.tab.filter(item=> item.id!= event.id)];
    //return new Observable (observer => {observer.next()});
  }

  updateEvenement(event: Evenement): Observable<Evenement>{
    return this.httpClient.put<Evenement>(`${this.baseUrl}/update`, event);
  }

  deleteEvenement(id: number): Observable<void>{
    this.httpClient.delete<void>(`http://localhost:9000/members/members-per-event/${id}/delete`);
    return this.httpClient.delete<void>(`${API.url}/${API.event}/events/${id}/delete`);
  }

  getEvenementById(id: number): Observable<Evenement>{
    return this.httpClient.get<Evenement>(`${this.baseUrl}/${id}`);
    //return new Observable((observer) => {observer.next(this.tab.find((event)=>event.id === id))});
  }

  getFullYearsEvents(startYear: number, endYear: number): Observable<number[]> {
    const url = `${this.baseUrl}/full-years-events/${startYear}/${endYear}`;
    return this.httpClient.get<number[]>(url);
  }


}

