import { APP_INITIALIZER, Injector, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { createCustomElement } from "@angular/elements";
import { control } from './alert-trans.control';
import { SviWindow } from "@sassoftware/vi-api";
import { AgGridModule } from "ag-grid-angular";
import { AlertTransComponent } from "./alert-trans.component";

@NgModule({
  imports: [AgGridModule, CommonModule, FormsModule, AlertTransComponent],
  exports: [AlertTransComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (injector: Injector) => {
        return () => {
          customElements.define(
            control.directiveName,
            createCustomElement(AlertTransComponent, { injector: injector })
          );
          
          const sviWindow = window as SviWindow;
          sviWindow.sas.vi?.config.registerSolutionExtension(control);
        };
      },
      deps: [Injector],
    },
  ],
})
export class AlertTransModule {}
