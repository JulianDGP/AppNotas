import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagsService } from 'src/app/service/tags.service';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css']
})
export class CreateTagComponent implements OnInit {
  tagForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private tagsService: TagsService) {
    this.tagForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.tagForm.valid) {
      const newTagName = this.tagForm.value.name;
      // Call the service to create a new tag
      this.tagsService.createTag(newTagName).subscribe({
        next: () => {
          // Handle successful creation
          // You could navigate to a new page, show a success message, etc. here
        },
        error: (err) => {
          if (err.status === 409) {
            // Tag already exists, show an alert to the user
            this.errorMessage = 'La etiqueta ya existe en la base de datos.';
            alert(this.errorMessage);
          } else {
            // Handle other errors as needed
            console.error('Error creating tag:', err);
          }
        }
      });
    }
  }
}
