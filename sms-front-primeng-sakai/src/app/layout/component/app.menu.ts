import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/pages/dashboard'] }]
            },
            {
                label: 'XXX',
                items: [{ label: 'Landing', icon: 'pi pi-fw pi-globe', routerLink: [''] }]
            }, 
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase', 
                items: [
                    {
                        label: 'User Management',
                        icon: 'pi pi-fw pi-users', // Icon for user management
                        items: [
                            {
                                label: 'List Users',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/pages/users']
                            },
                            {
                                label: 'Add New User',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/pages/users/new']
                            }
                        ]
                    },      
                    {
                        label: 'Suppliers',
                        icon: 'pi pi-fw pi-truck', // Icon for suppliers
                        items: [
                            {
                                label: 'List Suppliers',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/pages/suppliers']
                            },
                            {
                                label: 'Add New Supplier',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/pages/suppliers/new']
                            }
                        ]
                    },
                    {
                        label: 'Products',
                        icon: 'pi pi-fw pi-box', // Icon for products
                        items: [
                            {
                                label: 'List Products',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/pages/products']
                            },
                            {
                                label: 'Add New Product',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/pages/products/new']
                            }
                        ]
                    }, 
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    } 
                ]
            },
 
       
            {
                label: 'YYYY',
                items: [
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    }, 
                    {
                        label: 'Logout',
                        icon: 'pi pi-fw pi-sign-out',
                        routerLink: ['/logout']
                    } 
                ]
            }
        ];
    }
}
