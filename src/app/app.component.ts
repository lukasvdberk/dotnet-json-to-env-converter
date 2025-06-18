import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dotnet-json-to-env-converter';
  jsonInput = '';
  envOutput = '';
  error = '';

  convertJsonToEnv() {
    this.error = '';
    this.envOutput = '';
    let obj: any;
    try {
      obj = JSON.parse(this.jsonInput);
    } catch (e) {
      this.error = 'Invalid JSON';
      return;
    }
    this.envOutput = this.flattenToEnv(obj);
  }

  private flattenToEnv(obj: any, prefix: string = ''): string {
    let result: string[] = [];
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      const value = obj[key];
      const envKey = prefix ? `${prefix}:${key}` : key;
      if (typeof value === 'object' && value !== null) {
        result.push(this.flattenToEnv(value, envKey));
      } else {
        result.push(`${envKey}=${value}`);
      }
    }
    return result.join('\n');
  }
}
