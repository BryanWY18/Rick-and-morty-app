import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Character, CharacterListResponse, CharacterFilters, Episode } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private httpClient = inject(HttpClient);

  getCharacters( page = 1, filters: CharacterFilters = {}): Observable<CharacterListResponse> {
    let params = new HttpParams().set('page', page.toString());

    if (filters.name) {
      params = params.set('name', filters.name);
    }
    if (filters.status) {
      params = params.set('status', filters.status);
    }
    if (filters.species) {
      params = params.set('species', filters.species);
    }
    if (filters.gender) {
      params = params.set('gender', filters.gender);
    }
    return this.httpClient.get<CharacterListResponse>(this.apiUrl, { params });
  }

  getCharacter(id: number): Observable<Character> {
    return this.httpClient.get<Character>(`${this.apiUrl}/${id}`);
  }

  getEpisode(id: number[]): Observable<Episode[]> {
    if (id.length === 0) {
      return of([]);
    }
    return this.httpClient.get<Episode | Episode[]>(`https://rickandmortyapi.com/api/episode/${id.join(',')}`)
    .pipe(map(res => (Array.isArray(res) ? res : [res])))
  }
}
