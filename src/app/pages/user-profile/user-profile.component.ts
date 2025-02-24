import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../shared/services/auth.service';
import { NovaPoshtaService, Warehouse } from '../../shared/services/nova-poshta.servic';
import { emailValidator, nameValidator, phoneNumberValidator } from '../../shared/validators/validator';
import { FormErrorComponent } from '../../components/form-error/form-error.component';

@Component({
  selector: 'fd-user-profile',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  profileForm!: FormGroup;
  warehouses: Warehouse[] = [];
  user?: User

  constructor(
    private userService: AuthService, 
    private fb: FormBuilder,
    private novaPoshtaService: NovaPoshtaService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserData();
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, nameValidator]], 
      email: ['', [Validators.required, emailValidator]], 
      phoneNumber: ['', [Validators.required, phoneNumberValidator]],
      city: ['', Validators.required],
      novaPostDepartment: [''],
    });
  }

  onEnterPress(event: Event): void {
    event.preventDefault(); 
    
    const city = this.profileForm.get('city')?.value;
    const searchQuery = this.profileForm.get('novaPostDepartment')?.value;
  
    if (city && searchQuery) {
      this.novaPoshtaService.getWarehouses(city, searchQuery).subscribe(response => {
        this.warehouses = response;
        this.cdRef.detectChanges(); 
      });
    }
  }  

  selectWarehouse(department: string): void {
    this.profileForm.patchValue({ novaPostDepartment: department });
    this.warehouses = [];
  }

  editUser(): void {
    const formValues = this.profileForm.value;

    const updatedUser: User = {
      name: formValues.name,
      email: formValues.email,
      phoneNumber: formValues?.phoneNumber,
      deliveryAddress: {
        city: formValues?.city,
        novaPostDepartment: formValues?.novaPostDepartment
      }
    };

    this.userService.editUser(updatedUser).subscribe();
  }

  private loadUserData(): void {
    this.userService.getCachedUser().subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        this.profileForm.patchValue({
          email: user.email, 
          name: user.name, 
          phoneNumber: user.phoneNumber || '', 
          novaPostDepartment: user.deliveryAddress?.novaPostDepartment || '',
          city: user.deliveryAddress?.city || ''
        });
      }
    });
  }
}
