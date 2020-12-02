import { FilesService } from './Service/Files.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { FileManagerComponent } from './File-manager/File-manager.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RenameDialogComponent } from './File-manager/modals/renameDialog/renameDialog.component';
import { NewFolderDialogComponent } from './File-manager/modals/newFolderDialog/newFolderDialog.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
      AppComponent,
      FileManagerComponent,
      NewFolderDialogComponent,
      RenameDialogComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule  
  ],
  providers: [FilesService,MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
