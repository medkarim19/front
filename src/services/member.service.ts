import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API, GLOBAL } from 'src/app/app-config';
import { Enseignant } from 'src/models/enseignant';
import { Etudiant } from 'src/models/etudiant';
import { Member } from 'src/models/member';


@Injectable({
  providedIn: 'root'
})

export class MemberService {
  private baseUrl = 'http://localhost:9000/members';
  //Injection de HTTP CLIENT
  constructor(private httpClient: HttpClient) {

  }

  saveMember(type:string, member: Member): Observable<Member>{
    if (type == "etudiant") {
      return this.httpClient.post<Member>(`${this.baseUrl}/etudiant/create`, member);

      // @RequestBody(name="member") Member member
    } else if (type == "enseignant") {
      return this.httpClient.post<Member>(`${this.baseUrl}/enseignant/create`, member);
    } else {
      return new Observable(observer => observer.error('Invalid member type'));
    }
    //ken maandekch back-end

    //this.tab.unshift(member);
    //this.tab = [member, ...this.tab.filter(item=> item.id!= member.id)];
    //return new Observable (observer => {observer.next()});
  }

  updateMember(type:string, member: Member): Observable<Member>{
    if (type == "etudiant") {
      return this.httpClient.put<Member>(`${this.baseUrl}/etudiant/${member.id}/update`, member);
    } else if (type == "enseignant") {
      return this.httpClient.put<Member>(`${this.baseUrl}/enseignant/${member.id}/update`, member);
    } else {
      return new Observable(observer => observer.error('Invalid member type'));
    }
    //ken maandekch back-end

    //this.tab.unshift(member);
    //this.tab = [member, ...this.tab.filter(item=> item.id!= member.id)];
    //return new Observable (observer => {observer.next()});
  }

  getMemberById(id: number): Observable<Member>{
    return this.httpClient.get<Member>(`${this.baseUrl}/${id}`);
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  getMembers(): Observable<Member[]>{
    return this.httpClient.get<Member[]>(`${this.baseUrl}`);
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  getEnseignants(): Observable<Enseignant[]>{
    return this.httpClient.get<Enseignant[]>(`${this.baseUrl}/enseignants`);
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  getEtudiants(): Observable<Etudiant[]>{
    return this.httpClient.get<Etudiant[]>(`${this.baseUrl}/etudiants`); // observe
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  affectEtudiantToEnseignant(etudiant : Member, enseignant : Member) : Observable<void>
  {
    return this.httpClient.put<void>(`${this.baseUrl}/affect-encadrant/${enseignant.id}`, etudiant.id);
  }


  getNbPubMembers(): Observable<number[]>
  {
    return this.httpClient.get<number[]>(`${this.baseUrl}/numberpublications`);
  }
  getNbOutilMembers(): Observable<number[]>
  {
    return this.httpClient.get<number[]>(`${this.baseUrl}/numberoutils`);
  }

  getNumberPerMemberType(): Observable<Record<string,number>>
  {
    return this.httpClient.get<Record<string,number>>(`${this.baseUrl}/members-per-role`);
  }

  getNumberPerMemberGrade(): Observable<Record<string,number>>
  {
    return this.httpClient.get<Record<string,number>>(`${this.baseUrl}/members-per-grade`);
  }
  getNumberPerMemberDiplome(): Observable<Record<string,number>>
  {
    return this.httpClient.get<Record<string,number>>(`${this.baseUrl}/members-per-diplome`);
  }

  getNumberPerMemberEtablissement(): Observable<Record<string,number>>
  {
    return this.httpClient.get<Record<string,number>>(`${this.baseUrl}/members-per-etablissement`);
  }


  affectMemberToEvent(idMember: number, idEvent: number): Observable<void>
  {
    return this.httpClient.post<void>(`${this.baseUrl}/affect-event/${idEvent}`,idMember);
  }
  affectMemberToTool(idMember: number, idTool: number): Observable<void>
  {
    return this.httpClient.post<void>(`${this.baseUrl}/affect-tool/${idTool}`,idMember);
  }
  affectMemberToPub(idMember: number, idPub: number): Observable<void>
  {
    return this.httpClient.post<void>(`${this.baseUrl}/affect-pub/${idPub}`,idMember);
  }

  getMemberByOutil(idOutil: number) : Observable<Member>
  {
    return this.httpClient.get<Member>(`${this.baseUrl}/members-outil/${idOutil}`);
  }

  getMembersByEvent(idEvent: number) : Observable<Member[]>{
    return this.httpClient.get<Member[]>(`${this.baseUrl}/members-per-event/${idEvent}`);
  }
  deleteEnseignant(memberId: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/enseignant/${memberId}/delete`);
  }

  deleteEtudiant(memberId: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/etudiant/${memberId}/delete`);
  }
}
