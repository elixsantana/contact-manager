import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import components from 'src/app/components';
import services from 'src/app/services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [AppComponent, ...components],
	imports: [BrowserModule, AppRoutingModule, FormsModule, CommonModule],
	providers: services,
	bootstrap: [AppComponent]
})
export class AppModule {}
