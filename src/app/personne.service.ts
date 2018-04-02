import { Injectable } from '@angular/core';
import { Personne } from "./personne";
import { Observable } from 'rxjs/Observable';       //sert à opération asynchrone, pour chercher les données d'un serveur distant
import { of } from 'rxjs/observable/of';            //symbole pour le RxJS (librairie Javascript)
import { HttpClient, HttpHeaders } from '@angular/common/http';     //protocole question/1 seule réponse
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()       // sert pour les dépendances
export class PersonneService {

    private personnesUrl = "api/personnes";         //URL vers l'API web

    private handleError<T> (result?: T) {               //traitement en cas d'erreur (result => valeur à renvoyer comme résultat observable)
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }

    constructor(private http : HttpClient) { }

    getPersonnes(): Observable<Personne[]>{         //méthode qui joue le rôle de callback (signature asynchrone)
        //return of(PERSONNES);                       //(avant, renvoyait juste Personne[]) renvoie un Observable<Personne[]>, avec valeur unique
        return this.http.get<Personne[]>(this.personnesUrl)     //on obtient les personnes du serveur
            .pipe(
                catchError(this.handleError([]))           //le catch error se déclanche quand l'Observable a échoué
            );
                                                                //le get retourne la reponse, de type <Personne[]>
    }

    getPersonne(idP: number): Observable<Personne> {
        //return of(PERSONNES.find(personne => personne.id === idP));
        const url = `${this.personnesUrl}/${idP}`;
        return this.http.get<Personne>(url)
            .pipe(
                catchError(this.handleError<Personne>())
            );

    }

    sauvegardePersonne (pers: Personne): Observable<any> {              //le put permet de sauvegarder la personne dans le serveur
        return this.http.put(this.personnesUrl, pers)
            .pipe(
                catchError(this.handleError<any>("sauvegardePersonne"))
        );
    }

    ajoutPersonne (pers : Personne): Observable<Personne> {
        return this.http.post<Personne>(this.personnesUrl, pers)        //le post sert à générer un nouvel id pour la personne
            .pipe(                                                      //qui est retourné dans le Observable<Personne>
                catchError(this.handleError<Personne>())
            )
    }

    suppressionPersonne (pers : Personne | number): Observable<Personne>{
        const idP = typeof pers === 'number' ? pers : pers.id;          //suppression grâce à la fonction http.delete
        const url = `${this.personnesUrl}/${idP}`;                      //url => URL des ressources Personnes + id de pers à supprimer
        return this.http.delete<Personne>(url)
            .pipe(
                catchError(this.handleError<Personne>())
            );
    }

    barreRecherche(pers : string): Observable <Personne[]>{
        if (!pers.trim()){
            return of([]);          //si la case est vide, on retourne un tableau de personnes vide
        }                                                                          //Fonctionne comme le getPersonnes sauf que l'URL...
        return this.http.get<Personne[]>(`api/personnes/?prenom=${pers}`)       //...contient une chaîne de requête avec le terme recherché
            .pipe(
                catchError(this.handleError<Personne[]>([]))
            );
    }

} // La classe Service est un meilleure moyen de partager des informations entre des classes qui ne se connaissent pas
