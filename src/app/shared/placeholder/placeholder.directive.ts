import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  // Arguments

  // Constructor
  constructor(public viewContainerRef: ViewContainerRef) {}

  // Hooks

  // Methods
}
