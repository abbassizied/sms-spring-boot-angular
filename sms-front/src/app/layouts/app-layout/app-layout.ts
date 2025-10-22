import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { RouterModule } from '@angular/router';
import { Sidebar } from "../sidebar/sidebar";

@Component({
  selector: 'app-app-layout',
  imports: [Header, Footer, RouterModule, Sidebar],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css'
})
export class AppLayout {

}
