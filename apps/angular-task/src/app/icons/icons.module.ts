import { NgModule } from '@angular/core';
import { InfoComponent } from './info/info.component';
import { SearchComponent } from './search-icon/search-icon.component';

const ICON_MODULES = [
    InfoComponent,
    SearchComponent
];

@NgModule({
    imports: ICON_MODULES,
    exports: ICON_MODULES
})
export class IconsImportsModule { }
