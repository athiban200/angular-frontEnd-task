import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  files: File[] = [];
  errorMsg: string = '';
  uploadError: string = '';
  showSuccessMessage: string = '';
  uploadProgress: number | undefined;

  constructor(private fireStorage: AngularFireStorage, private ngZone: NgZone) { }

  ngOnInit(): void { }

  onSelect(event: any) {

    for (const file of event.addedFiles) {
      if (file.size > 10 * 1024 * 1024) {
        this.errorMsg = `File size exceeds 100KB. Please select a smaller file.`;
      } else {
        this.files.push(file);
        this.errorMsg = '';
        this.showSuccessMessage = '';
      }
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  uploadFiles() {
    const uploadTasks = [];
    if (this.files.length > 0) {
      for (const file of this.files) {
        const filePath = `my-storage/${file.name}`;
        const fileRef = this.fireStorage.ref(filePath);
        const uploadTask = this.fireStorage.upload(filePath, file);

        uploadTask.percentageChanges().subscribe((progress) => {
          this.ngZone.run(() => {
            this.uploadProgress = Math.round(progress || 0);
          });
        });

        const taskPromise = new Promise<void>((resolve, reject) => {
          uploadTask.snapshotChanges().pipe(
            finalize(() => this.ngZone.run(() => {
              this.clearFiles();
              resolve();
            }))
          ).subscribe(
            () => { },
            (error) => reject(error)
          );
        });

        uploadTasks.push(taskPromise);
      }

      // Use Promise.all to wait for all tasks to complete
      Promise.all(uploadTasks)
        .then(() => {
          this.showSuccessMessage = 'File uploads completed successfully'
        })
        .catch((error) => {
          this.uploadError = 'Error uploading files'
        });
    } else {
      this.errorMsg = "Please select file"
    }

  }

  clearFiles() {
    this.files = [];
    this.uploadProgress = undefined;
  }
}
