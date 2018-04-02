import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';       // sert pour le ngModel
import { PersonneService } from "./personne.service";
import { HttpClientModule } from '@angular/common/http';    //mécanisme de communication avec un serveur distant
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService} from "./in-memory-data-service";


import { AppComponent } from './app.component';
import { PersonnesComponent } from './personnes/personnes.component';
import { PersonneDetailComponent } from './personne-detail/personne-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { FavorisComponent } from './favoris/favoris.component';
import { PersonneRechComponent } from './personne-rech/personne-rech.component';


@NgModule({
    declarations: [
        AppComponent,
        PersonnesComponent,
        PersonneDetailComponent,
        FavorisComponent,
        PersonneRechComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(         //intercepte les requêtes HTTP et renvoie des réponses de serveur simulés
            InMemoryDataService, { dataEncapsulation: false }
        )
    ],
    providers: [        // sert à injecter dans n'importe quelle classe qui le demande (1 seule instance)
        PersonneService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
