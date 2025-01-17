import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, GLOBAL } from 'src/app/app-config';
import { Tool } from 'src/models/tool';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private baseUrl = 'http://localhost:9000/tools';
  private baseUrl2 = 'http://localhost:9000/members';
  // tabOutils : Tool[]= GLOBAL._DB.tools;
  constructor(private httpClient: HttpClient) {}

  getTools(): Observable<Tool[]>{
    return this.httpClient.get<Tool[]>(`${this.baseUrl}`);
    // return new Observable((observer) => {observer.next(this.tabOutils)});
  }

  saveTool(tool: Tool): Observable<Tool>{

    return this.httpClient.post<Tool>(`${this.baseUrl}/create`, tool);

    //ken maandekch back-end

    // //this.tab.unshift(member);
    // this.tabOutils = [tool, ...this.tabOutils.filter(item=> item.id!= tool.id)];
    // console.log(this.tabOutils);
    // return new Observable (observer => {observer.next()});
  }



  updateTool(tool: Tool): Observable<Tool>{
    return this.httpClient.put<Tool>(`${this.baseUrl}/${tool.id}/update`, tool);
  }

  deleteTool(id: number): Observable<void>{
    this.httpClient.delete<void>(`${this.baseUrl2}/members-per-outil/${id}/delete`);
    return this.httpClient.delete<void>(`${this.baseUrl}/tools/${id}/delete`);
  }

  getToolById(id: number): Observable<Tool>{
    return this.httpClient.get<Tool>(`${this.baseUrl}/${id}`);
    //return new Observable((observer) => {observer.next(this.tab.find((event)=>event.id === id))});
  }


}
