import { FileElement } from './../model/element';
import { FileUploadModel } from './../model/fileUploadedModel';
import { FilesService } from './../Service/Files.service';
import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from './modals/newFolderDialog/newFolderDialog.component';
import { RenameDialogComponent } from './modals/renameDialog/renameDialog.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'file-manager',
  templateUrl: './File-manager.component.html',
  styleUrls: ['./File-manager.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class FileManagerComponent implements OnInit {
  fileElements: FileElement[] = [];
  directorios: string[];
  archivos: string[];
  canNavigateUp = true;
  path: string;
  pathHistory: string[] = [];

  @Input() text = 'Upload';
  @Input() param = 'file';
  @Input() target = 'http://localhost:5000/upload/';
  @Input() accept = 'text/*';
  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{ element: FileElement; moveTo: FileElement }>();
  @Output() navigatedUp = new EventEmitter();

  fileInformation: any;
  public files: Array<FileUploadModel> = [];

  
  constructor(private fileS: FilesService, public dialog: MatDialog,
    private http: HttpClient, private _snackBar: MatSnackBar){}

  ngOnInit(){
    this.Load('');
  }

  refresh(){
    if(this.path === '\\'){
      this.Load('');
    }else{
      this.Load(this.path);
    }
  }

  Load(ruta:string){
    this.fileElements = [];
    this.fileS.consultar(ruta).subscribe(data => {
      this.path = data.path;
      if(this.path === '\\'){
        this.canNavigateUp = false;
      }else{
        this.canNavigateUp = true;
      }
      // tslint:disable-next-line: forin
      for ( let a in data.content.directories ) {
        let b = new FileElement();
        b.isFolder = true;
        b.name = data.content.directories[a];
        this.fileElements.push(b);
      }
      // tslint:disable-next-line: forin
      for ( let a in data.content.files ) {
        let b = new FileElement();
        b.isFolder = false;
        b.name = data.content.files[a];
        this.fileElements.push(b);
      }
    });
  }

  openDirectory(element: FileElement) {
    if(this.path === '\\'){
      this.pathHistory.push(this.path);
      this.Load(element.name);
    }else{
      this.pathHistory.push(this.path);
      this.Load(this.path + '-' + element.name);
    }
  }
  openDirectoryALt() {
    let url = this.pathHistory[this.pathHistory.length-1];
    this.pathHistory.pop();
    this.Load(url);
  }

  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  navigate(element: FileElement) {
    if (element.isFolder) {
      this.navigatedDown.emit(element);
    }
  }

  navigateUp() {
    this.openDirectoryALt();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.fileS.upload(this.pathHistory[this.pathHistory.length-1],res).subscribe( data=>{
          console.log(data);
        });
        this.folderAdded.emit({ name: res });
      }
    });
  }

  openRenameDialog(element: FileElement) {
    let dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this.elementRenamed.emit(element);
      }
    });
  }

  openMenu(event: MouseEvent, element: FileElement, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }


  
  // A partir de aqui es del uploader
  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    fileUpload.onchange = () => {

      const fd = new FormData();
      fd.append('file', fileUpload.files[0]);

      let pathTemp = '';
      if(this.path === '\\'){
        pathTemp = '';
      }else{
        pathTemp = this.path;
      }

      this.fileS.upload(pathTemp, fd).subscribe( data => {
        console.log(data);
        this._snackBar.open(data.message, 'Aceptar', {
          duration: 3000
        });

        this.refresh();
      });

    };

    fileUpload.click();
  }

  
}
