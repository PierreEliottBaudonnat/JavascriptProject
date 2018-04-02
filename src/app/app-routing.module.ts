import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';         //pour configurer routeur
import { PersonnesComponent } from "./personnes/personnes.component";
import { FavorisComponent } from "./favoris/favoris.component";
import { PersonneDetailComponent } from "./personne-detail/personne-detail.component";

const routes: Routes = [
                                                            //le path correspond à l'URL dans la barre d'adresse du navigateur
    {path: "personnes", component: PersonnesComponent},     //le component correspond au composant à créer lors de la navigation
    {path: "favoris", component: FavorisComponent},
    {path: "detail/:id", component : PersonneDetailComponent},
    {path: "", redirectTo : "/favoris", pathMatch : "full" }    //route par défaut
];

@NgModule({

    imports : [
        RouterModule.forRoot(routes)
    ],

    exports: [
        RouterModule            //rend routeur disponible pour l'utilisation dans le AppModule
    ],

    declarations: []
})
export class AppRoutingModule { }
