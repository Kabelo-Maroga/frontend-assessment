import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  template: ""
})
export class SafeUnsubscribe implements OnDestroy {
  protected _ngUnsubscribe: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
