  import { NgModule } from "@angular/core";
  import {
    NoPreloading,
    RouterModule,
    Routes,
    UrlSerializer,
  } from "@angular/router";
  import { AdminAuthGuardService } from "./admin/services/admin-auth-guard.service";
  import { PageNotFoundComponent } from "./core/components/page-not-found/page-not-found.component";
  import { AuthGuardService } from "./shared/guards/auth-guard.service";

  // lazy loading
  const routes: Routes = [
    {
      path: "",
      loadChildren: () =>
        import("src/app/shopping/shopping.module").then((m) => m.ShoppingModule),
    },
    {
      path: "admin",
      canLoad: [AdminAuthGuardService], // to load the module conditionally
      canActivate: [AuthGuardService, AdminAuthGuardService],
      loadChildren: () =>
        import("src/app/admin/admin.module").then((m) => m.AdminModule),
    },
    // WILD Card route path --> If no path matches go to page not found
    {
      path: "**",
      component: PageNotFoundComponent,
    },
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload',
        preloadingStrategy: NoPreloading,
        scrollPositionRestoration: "enabled",
        paramsInheritanceStrategy: "always",
        relativeLinkResolution: "corrected",
        malformedUriErrorHandler: (
          error: URIError,
          urlSerializer: UrlSerializer,
          url: string
        ) => urlSerializer.parse("/page-not-found"),
      }),
    ],
  })
  export class AppRouterModule {}
