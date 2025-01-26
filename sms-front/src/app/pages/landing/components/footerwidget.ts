import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'footer-widget',
    imports: [],
    template: `
        <footer class="py-6 px-4 lg:px-12 mx-0 mt-20 lg:mx-20">
            <div class="flex justify-center items-center">
                <div class="text-center text-gray-700 text-sm">&copy; {{ year }} SMS. All rights reserved.</div>
            </div>
        </footer>
    `
})
export class FooterWidget{
    year = new Date().getFullYear(); 
}
