import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ConfigurationService } from './services/configuration.service';
import { GestionService } from './services/gestion.service';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { TodaysComponent } from './components/todays/todays.component';
import { IncomingComponent } from './components/incoming/incoming.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GestionCurrentComponent } from './components/gestion-current/gestion-current.component';
import { GestionListComponent } from './components/gestion-list/gestion-list.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'todays', component: TodaysComponent },
  { path: 'incoming', component: IncomingComponent },
  { path: 'gestion-current', component: GestionCurrentComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TodaysComponent,
    IncomingComponent,
    HomeComponent,
    PageNotFoundComponent,
    GestionCurrentComponent,
    GestionListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ConfigurationService, GestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
