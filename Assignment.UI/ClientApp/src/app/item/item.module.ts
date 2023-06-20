import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemClothesComponent } from './item-clothes.component';
import { ItemMobileComponent } from './item-mobile.component';
import { ItemElectronicsComponent } from './item-electronics.component';
import { ItemRoutingModule } from './item-routing.component';
import { ItemComputerComponent } from './item-computer.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ItemRoutingModule
    ],
    declarations: [
      ItemClothesComponent,
      ItemMobileComponent,
      ItemElectronicsComponent,
      ItemComputerComponent
    ]
})
export class ItemModule { }