import {Component, OnDestroy, OnInit} from '@angular/core';
import {RegistrationService} from '../services/registration.service';
import { NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RegistrationModel} from '../models/registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy{
  registrations: RegistrationModel[] = [];
  private registrationSub: Subscription;

  constructor(public registrationService: RegistrationService) {
  }

  onRegistration(form: NgForm){
    if (form.invalid){
      return;
    }
    this.registrationService.addRegistration(form.value.firstName,
      form.value.lastName,
      form.value.email,
      form.value.password);
    form.resetForm();
  }

  ngOnInit() {
    this.registrations = this.registrationService.getRegistration();
    this.registrationSub = this.registrationService.getRegistrationUpdatedListener()
      .subscribe((registrations: RegistrationModel[]) => {
      this.registrations = registrations;
    });
  }

  ngOnDestroy() {
    this.registrationSub.unsubscribe();
  }
}
