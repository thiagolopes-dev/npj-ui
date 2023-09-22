import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListboxModule } from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';

// import {HotkeyModule} from 'angular2-hotkeys';

@NgModule({
  // imports: [HotkeyModule.forRoot()],
  exports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    DialogModule,
    InputMaskModule,
    CheckboxModule,
    TooltipModule,
    ReactiveFormsModule,
    PasswordModule,
    InputSwitchModule,
    RadioButtonModule,
    InputTextareaModule,
    KeyFilterModule,
    SelectButtonModule,
    TabViewModule,
    PanelModule,
    FileUploadModule,
    ProgressSpinnerModule,
    OverlayPanelModule,
    AccordionModule,
    TreeModule,
    ProgressBarModule,
    InputNumberModule,
    SidebarModule,
    AutoCompleteModule,
    TagModule,
    DividerModule,
    StepsModule,
    ScrollTopModule,
    OrderListModule,
    AvatarModule,
    AvatarGroupModule,
    MessagesModule,
    MessageModule,
    SkeletonModule,
    BadgeModule,
    PaginatorModule,
    TreeTableModule,
    OrderListModule,
    ListboxModule,
    CascadeSelectModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    SplitButtonModule,
    CarouselModule,
    DynamicDialogModule

  ]
})
export class PrimeNGModule { }