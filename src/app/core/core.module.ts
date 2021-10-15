import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, BrowserModule],
  exports: [CommonModule, HttpClientModule, BrowserModule],
})
export class CoreModule {}
