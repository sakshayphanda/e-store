import { environment } from "./../environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from "@angular/core";
import { AppComponent } from "./app.component";
import { FirebaseOptionsToken } from "angularfire2";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NotificationModule } from "sp-notifications";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { AppRouterModule } from "./app.router-module";
import { HttpClient } from "@angular/common/http";

function initializeApp(): Promise<any> {
  return new Promise((resolve, reject) => {
    // Do some asynchronous stuff before the bootstrap
    resolve(true);
  });
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRouterModule,
    BrowserAnimationsModule,
    NotificationModule,
    SharedModule,
    CoreModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: FirebaseOptionsToken, useValue: environment.firebase },
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeApp,
      deps: [HttpClient],
      multi: true     }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
