import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient } from '@angular/common/http';
import { GitUsers } from './git-users';


@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedValues: Array<{
    [query: string]: GitSearch, GitUsers
  }> = [];
  constructor(private http: HttpClient) {
   }

  gitSearch = (query: string): Promise<GitSearch> => {
    let promise = new Promise<GitSearch>((resolve, reject) => {
      if (this.cachedValues[query]) {
        resolve(this.cachedValues[query]);
      }
      else {
        this.http.get('https://api.github.com/search/repositories?q=' + query)
        .toPromise()
        .then( (response) => {
          resolve(response as GitSearch)
        }, (error) => {
          reject(error);
        })
      }

    })
    return promise;
  }
  gitUsers = (query : string): Promise<GitUsers> => {
    let promise = new Promise<GitUsers> ((resolve, reject) => {
      if (this.cachedValues[query]) {
        resolve(this.cachedValues[query])
      }
      else {
        this.http.get('https://api.github.com/search/users?q=' + query)
        .toPromise()
        .then( (response) => {
          resolve(response as GitUsers)
        }, (error) => {
          reject(error);
        })
      }
    })
    return promise;
  }
}
