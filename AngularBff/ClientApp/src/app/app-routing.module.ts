import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UserSessionComponent } from './user-session/user-session.component';

const routes: Routes = [
  {path: 'todo', component: TodoComponent},
  {path: 'counter', component: CounterComponent },
  {path: 'fetch-data', component: FetchDataComponent},
  { path: 'user-session', component: UserSessionComponent },
  {
    path: '',
    redirectTo: '/todo',
    pathMatch: 'full'
  }
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
