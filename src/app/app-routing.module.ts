import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'llenar-informacion',
    loadChildren: () =>
      import('./llenar-informacion/llenar-informacion.module').then(
        (m) => m.LlenarInformacionPageModule
      ),
  },
  {
    path: 'informacion-modal',
    loadChildren: () => import('./informacion-modal/informacion-modal.module').then( m => m.InformacionModalPageModule)
  },
  {
    path: 'image-viewer-modal',
    loadChildren: () => import('./image-viewer-modal/image-viewer-modal.module').then( m => m.ImageViewerModalPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
