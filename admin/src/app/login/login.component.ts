import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName: String;
  passWord: String;
  validateForm!: FormGroup;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    this.userName = this.validateForm.controls.userName.value;
    this.passWord = this.validateForm.controls.password.value;
    if (this.userName && this.passWord) {
      this.loginService.loginAdmin(this.userName, this.passWord).subscribe(
        (data) => {
            if (data.errCode != 'false') {
              localStorage.setItem('auth', data.data.auth);
              localStorage.setItem('username', data.data.username);
              this.router.navigate(['/home']);
            }else{
              this.createNotification('error');
            }
        },
        (error) => {
          this.createNotification('error');
        }
      );
    }
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  createNotification(type: string): void {
    this.notification.create(
      type,
      'Đăng nhập không thành công!',
      'Vui lòng kiểm tra lại tên tài khoản và mật khẩu.'
    );
  }
}
