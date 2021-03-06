import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'login',loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'app', canActivate: [AuthGuard], loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'legal', loadChildren: './components/legal/legal.module#LegalPageModule' },
  // { path: 'image-options', loadChildren: './image-options/image-options.module#ImageOptionsPageModule' },
  // { path: 'about', loadChildren: './components/about/about.module#AboutPageModule' },
  // { path: 'image-detail', loadChildren: './image-detail/image-detail.module#ImageDetailPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
