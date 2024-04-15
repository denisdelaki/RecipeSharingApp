import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  implements OnInit {
  searchForm!: FormGroup;
  showResetIcon: boolean = false;
  filteredData: any[] = [];

  constructor(private formBuilder: FormBuilder, 
    ){
      this.searchForm = this.formBuilder.group({
        search: ['', Validators.required]
      });
    }
    ngOnInit(): void {
      this.searchForm = this.formBuilder.group({
        search: [''] // Initialize the search input
      });
    }
  
    // Method to filter data based on search input
    filterData() {
      const searchTerm = this.searchForm.get('search')?.value.toLowerCase();
      // Perform filtering logic here and assign filtered data to filteredData array
      // Example: this.filteredData = this.allData.filter(item => item.name.toLowerCase().includes(searchTerm));
      // Replace "item.name" with the property you want to filter by
      this.showResetIcon = searchTerm !== ''; // Show reset icon if search input is not empty
    }
  
    // Method to reset search input and clear filter
    resetSearch() {
      this.searchForm.get('search')?.setValue(''); // Clear search input
      this.filteredData = []; // Clear filtered data
      this.showResetIcon = false; // Hide reset icon
    }
  }