import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Character, Episode, Location} from "../models/rick.model";

@Injectable({
  providedIn: 'root'
})

export class RickMortyService {


  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  public getCharacter(type: string, id: string | null): Observable<Character> {
    let request = type === 'character' ? this.apiUrl + 'character/' + id : id;
    return this.http.get<Character>(<string>request, {responseType: 'json'})
  }

  public getLocation(url: string): Observable<Location> {
    return this.http.get<Location>(`${url}`, {responseType: 'json'})
  }

  public getEpisode(url: string): Observable<Episode> {
    return this.http.get<Episode>(`${url}`, {responseType: 'json'})
  }

}
