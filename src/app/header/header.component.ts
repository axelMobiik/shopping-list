import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Arguments
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  // Constructor
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  // Hooks
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  // Methods
  onSaveData() {
    this.dataStorageService.storeRecipies();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipies().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
