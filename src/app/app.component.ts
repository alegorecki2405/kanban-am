import { Component } from '@angular/core';
import {Task} from "./Task";
import {Feature} from "./Feature";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  action: string = "";
  tasks: Task[] = [
    {
      id: 1,
      name: 'backengd projektu',
      status: 'TODO',
      featureId: 1
    },
    {
      id: 2,
      name: 'gui do projektu',
      status: 'TODO',
      featureId: 1
    },
  ];
  features: Feature[] = [
    {
      id: 1,
      name: "zdanie am",
      tasks: [],
      status: 'IN PROGRESS'
    },
  ]
}
