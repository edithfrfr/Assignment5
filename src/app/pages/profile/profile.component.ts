import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  profile = this.userService.profile;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    monthlyGoal: 0, 
  });

  constructor() {
    const p = this.profile();
    this.form.patchValue(p);
  }

  save() {
    if (this.form.invalid) return;

    this.userService.updateProfile(this.form.value);
  }
}
