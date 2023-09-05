import { Component } from '@angular/core';
import {Task} from "./Task";
import {Feature} from "./Feature";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  action: string = "ADD_TASK";
  id: number = 0;
  ableToEditTask: boolean = false;
  ableToEditFeature: boolean = false;
  foundTask: Task;
  foundFeature: Feature;
  featureOfTask: string;
  tasksOfFeature: Task[];
  tasks: Task[] = []
  features: Feature[] = []

  createTask(taskName: string, featureId: number) {
    this.id +=1
    const task: Task = {
      id: this.id,
      name: taskName,
      status: 'TODO',
      featureId: featureId,
      user: 'john doe'
    }
    this.tasks.push(task)
    this.features.find((obj) => {
      return obj.id === task.featureId;
    }).tasks.push(task)
  }
  createFeature(featureName: string) {
    this.id +=1
    const feature: Feature = {
      id: this.id,
      name: featureName,
      tasks: [],
      status: 'TODO',
    }
    this.features.push(feature)
  }
  loadTask(editTaskId: number) {
    const foundTask = this.tasks.find((obj) => {
      return obj.id === editTaskId
    })
    if (foundTask != undefined) {
      this.ableToEditTask=true;
      this.foundTask = foundTask;
      this.featureOfTask = this.features.find((obj) => {
        return obj.id === foundTask.featureId
      }).name
    } else {
      this.ableToEditTask=false;
      console.log("NO TASKS FOUND")
    }
  }
  editTask(editTaskName: string, editTaskStatus: string) {
    if (editTaskName !== '') {
      this.foundTask.name = editTaskName;
    }
    if (editTaskStatus !== '') {
      this.foundTask.status = editTaskStatus;
    }
    this.checkFeatureStatus();
  }
  deleteTask() {
    const index = this.tasks.indexOf(this.foundTask, 0)
    if (index> -1) {
      this.tasks.splice(index, 1)
    }
    this.ableToEditTask = false;
    const feature = this.features.find((obj) => {
      return obj.id === this.foundTask.featureId;
    });
    const indexInFeature = feature.tasks.findIndex((obj) => obj.id === this.foundTask.id)
    console.log(indexInFeature)
    if (indexInFeature> -1) {
      feature.tasks.splice(indexInFeature, 1)
    }
    this.checkFeatureStatus();
  }

  loadFeature(editFeatureId: number) {
    const foundFeature = this.features.find((obj) => {
      return obj.id === editFeatureId
    })
    if (foundFeature != undefined) {
      this.ableToEditFeature=true;
      this.foundFeature = foundFeature;
      this.tasksOfFeature = foundFeature.tasks;
    } else {
      this.ableToEditFeature=false;
      console.log("NO FEATURE FOUND")
    }
  }

  editFeature(editFeatureName: string) {
    if(editFeatureName !== '') {
      this.foundFeature.name = editFeatureName;
    }
  }
  deleteFeature() {
    const index = this.features.indexOf(this.foundFeature, 0)
    if (index> -1) {
      this.features.splice(index, 1)
    }
    this.ableToEditFeature = false;
  }

  todoTasks() {
    return this.tasks.filter(obj => obj.status === 'TODO')
  }

  inProgressTasks() {
    return this.tasks.filter(obj => obj.status === 'IN PROGRESS')
  }

  doneTasks() {
    return this.tasks.filter(obj => obj.status === 'DONE')
  }

  checkFeatureStatus() {
    this.features.forEach((obj) => {
      let allTodo = true;
      let allDone = true;
      obj.tasks.forEach((t) => {
        if(t.status !== 'TODO') {
          allTodo = false;
        }
      });
      obj.tasks.forEach((t) => {
        if(t.status !== 'DONE') {
          allDone = false;
        }
      });
      console.log(allTodo);
      console.log(allDone);
      if (!allTodo && !allDone) {
        obj.status = 'IN_PROGRESS'
      }else if (allTodo) {
        obj.status = 'TODO'
      }else if (allDone) {
        obj.status = 'DONE'
      }
    });
  }
}
