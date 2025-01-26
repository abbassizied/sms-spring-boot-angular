import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TopbarWidget } from './components/topbarwidget.component'; 
import { FooterWidget } from './components/footerwidget';
import { DataViewProductsComponent } from './components/data-view-products/data-view-products.component';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, TopbarWidget, FooterWidget, RippleModule, StyleClassModule, ButtonModule, DividerModule, DataViewProductsComponent, DataViewProductsComponent],
    template: `
        <div class="bg-surface-0 dark:bg-surface-900">
            <div id="home" class="landing-wrapper overflow-hidden">
                <topbar-widget class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static" />
                <app-data-view-products> </app-data-view-products> 
                <footer-widget />
            </div>
        </div>
    `
})
export class Landing {}
