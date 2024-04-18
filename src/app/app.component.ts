import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // Arguments

  // Constructor
  constructor(
    private authService: AuthService,
    private loggingService: LoggingService
  ) {}

  // Hooks
  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }

  // Methods
}
