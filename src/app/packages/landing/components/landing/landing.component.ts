import {
    Component, ChangeDetectionStrategy, ViewChild, ViewContainerRef,
    ComponentFactoryResolver, OnInit, ChangeDetectorRef, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
    ModalDialogComponent, HttpService, MatchesCategories, MatchesCategoriesTypes,
    MatchesResults, RecommendedProfile, Pagination, CategoryFilterPipe,
    CategoryOptions, UserDetailsResponse, ApplicationService, UserDetailsHelper
} from '@matrimony/common';
import { URLConfig } from '../../../../../config/url.config';

declare var $;

@Component({
    selector: 'app-landing',
    templateUrl: 'landing.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit, OnDestroy{

    @ViewChild('dialogContainer', { read: ViewContainerRef })
    _dialogContainer: ViewContainerRef;

    _isMultiCardView: boolean = false;
    _isMobileSortOpen: boolean = false;
    _isMobileFilterOpen: boolean = false;
    _categories: MatchesCategories[] = [];
    _matches: MatchesResults[] = [];
    _recommendations: RecommendedProfile[] = [];
    _slideType: MatchesCategoriesTypes = MatchesCategoriesTypes.SLIDER;
    _pagination: Pagination = new Pagination();
    _totalItems: number = 0;
    _sortingOptions: any[] = [];

    private _componentRef: any;
    private _subscriptions: Subscription[] = [];
    private _filteredData: MatchesResults[] = [];
    private _matchesBackup: MatchesResults[] = [];
    private _sortingBackup: MatchesResults[] = [];

    constructor(
        private _factoryResolver: ComponentFactoryResolver,
        private _httpService: HttpService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _categoryFilterPipe: CategoryFilterPipe,
        private _applicationService: ApplicationService
    ) { }

    ngOnInit(): void {
        this._applicationService._setMainHeaderStatus(true);
        this._getCategories();
        this._getMatches();
        this._getRecommendedProfiles();
        this._getSortingOptions();
    }

    /**
     * Handle the toggle card view
     */
    _onCardViewChanged(): void {
        this._isMultiCardView = !this._isMultiCardView;
        if (this._isMultiCardView) {
            this._pagination = new Pagination({
                currentPage: 0,
                alternative: 12
            });
        } else {
            this._pagination = new Pagination({
                currentPage: 0,
                alternative: 3
            });
        }
        this._setPagintionData();
    }

    /**
     * Method to peform sorting
     * @param {string} value
     */
    _onSorting(value: string): void {
        const filteredOptions = this._getActiveFilterOptions();
        if (value === 'none') {
            if (filteredOptions.length > 0) {
                this._filteredData = this._sortingBackup;
                this._setPagintionData(true);
            } else {
                this._matchesBackup = this._sortingBackup;
                this._totalItems = this._matchesBackup.length;
                this._pagination.currentPage = 0;
                this._setPagintionData();
            }
        } else {
            if (filteredOptions.length > 0) {
                this._sortingBackup = [...this._filteredData];
                this._filteredData.sort((a, b) => {
                    var x = a.joinedOn.toLowerCase(), y = b.joinedOn.toLowerCase();
                    if (x > y) { return -1; }
                    else { return 0 }
                });
                this._setPagintionData(true);
            } else {
                this._sortingBackup = [...this._matchesBackup];
                this._matchesBackup.sort((a, b) => {
                    var x = a.joinedOn.toLowerCase(), y = b.joinedOn.toLowerCase();
                    if (x > y) { return -1; }
                    else { return 0 }
                });
                this._totalItems = this._matchesBackup.length;
                this._pagination.currentPage = 0;
                this._setPagintionData();
            }
        }
    }

    /**
     * Method to render a modal component
     * @param {MatchesCategories} category
     * @param {Element} element
     */
    _onMoreOptionClick(category: MatchesCategories, element: Element): void {
        const factory = this._factoryResolver.resolveComponentFactory(ModalDialogComponent);
        this._componentRef = this._dialogContainer.createComponent(factory);
        this._componentRef.instance.targetElement = element;
        this._componentRef.instance.isModalActive = true;
        this._componentRef.instance.category = category;
        this._componentRef.instance.modalData = this._prepareModalData(category);
        this._doCanDestroySubscription();
    }

    /**
     * Event to handle data based on pagination
     * @param {Pagination} pagination
     */
    _onPaginationCliked(pagination: Pagination): void {
        this._pagination = pagination;
        this._setPagintionData();
    }

    /**
     * Method to handle filtering
     * @param {CategoryOptions} option
     * @param {MatchesCategories} category
     */
    _filterByCateory(option: CategoryOptions, category: MatchesCategories): void {
        if (option.id === 'any' && category.options && Array.isArray(category.options)) {
            if (option.checked) {
                category.options.forEach(item => {
                    if (item.id !== 'any') {
                        item.checked = true;
                    }
                });
            } else {
                category.options.forEach(item => {
                    if (item.id !== 'any') {
                        item.checked = false;
                    }
                });
            }
        }
        this._performFiltering();
    }

    /**
     * Event to filter data based on range slider
     * @param {MatchesCategories} category
     */
    _onUserChangeEnd(category: MatchesCategories): void {
        if (!category.isRangeStart) {
            category.isRangeStart = true;
        }
        this._performFiltering();
    }

    /**
     * Method to handle filters
     */
    private _performFiltering(): void {
        const filteredOptions = this._getActiveFilterOptions();
        if (filteredOptions.length > 0) {
            const finalData = this._categoryFilterPipe.transform(this._matchesBackup,
                filteredOptions);
            this._filteredData = finalData.filter(t => t.isMatch);
            this._setPagintionData(true);
        } else {
            this._totalItems = this._matchesBackup.length;
            this._pagination.currentPage = 0;
            this._setPagintionData();
        }
    }

    /**
     * Method to filtered the active selected filter options
     */
    private _getActiveFilterOptions(): any[] {
        let filterOptions: any[] = [];
        this._categories.forEach((category) => {
            if (category.options && Array.isArray(category.options)) {
                const filtered = category.options.filter(t => t.checked && t.id !== 'any');
                if (filtered.length > 0) {
                    filterOptions.push({
                        id: category.id,
                        options: filtered
                    });
                }
            } else {
                if (category.options && category.isRangeStart) {
                    filterOptions.push({
                        minValue: category.minValue,
                        maxValue: category.maxValue,
                        parent: category.id
                    });
                }
            }
        });
        return filterOptions;
    }

    /**
     * Method to handle destroy a modal component
     */
    private _doCanDestroySubscription(): void {
        this._subscriptions.forEach(s => s.unsubscribe());
        this._subscriptions.push(
            this._componentRef.instance.onCategorySelect
                .subscribe((modalData) =>
                    this._updateCategory(modalData)
                ));
        this._subscriptions.push(
            this._componentRef.instance.canDestroy()
                .subscribe(() =>
                    this._componentRef.destroy()
                ));
    }

    /**
     * Update the options based on positioned dialog selected options
     * @param {any} modalData
     */
    private _updateCategory(modalData: any): void {
        this._categories.forEach((category) => {
            if (category.options && Array.isArray(category.options) &&
                category.id === modalData.category.id) {
                category.options.forEach((option) => {
                    if (option.id === modalData.option.id) {
                        option.checked = modalData.option.checked;
                    }
                });
            }
        });
        this._performFiltering();
    }

    /**
     * Method to form a positioned dialog data
     * @param {MatchesCategories | any} category
     */
    private _prepareModalData(category: MatchesCategories | any): any {
        const divisions = [];
        let options = [];
        if (category.options && category.options.length > 0) {
            category.options.forEach((item) => {
                const isExist = divisions.find(t => t.divisionId === item.divisionId);
                if (!isExist) {
                    divisions.push({
                        divisionId: item.divisionId,
                        divisionName: item.divisionName,
                        options: []
                    });
                }
            });
            options = divisions;
            category.options.forEach((item) => {
                const isExist = options.find(t => t.divisionId === item.divisionId);
                if (isExist) {
                    isExist.options.push({
                        id: item.id,
                        name: item.name,
                        count: item.count,
                        checked: item.checked
                    });
                }
            });
        }
        return { divisions: divisions, options: options };
    }

    /**
     * Method to get a categories from REST
     */
    private _getCategories(): void {
        this._httpService.getService(URLConfig.matchesCategories)
            .subscribe((categories: MatchesCategories[]) => {
                this._categories = categories;
                this._setFiltersOffFlag();
                this._detectChanges();
            });
    }

    /**
     * Method to set additional flag
     */
    private _setFiltersOffFlag(): void {
        this._categories.forEach(category => {
            if (category.options && Array.isArray(category.options)) {
                category.options.forEach(t => t.checked = false);
            }
        });
    }

    /**
     * Method to get a matches from REST
     * http://localhost:9090/groomdetail/9172
     *  this._httpService.getService("http://localhost:9090/userdetails")
            .subscribe((response: UserDetailsResponse[]) => {
     */
    private _getMatches(): void {
        this._httpService.getService(URLConfig.matchesResults)
            .subscribe((matches: MatchesResults[]) => {
                // Rest call -> Matches
                // const testData = UserDetailsHelper.getFormattedUserDetails(matches);
                this._matchesBackup = matches;
                this._totalItems = this._matchesBackup.length;
                this._setPagintionData();
                this._detectChanges();
            });
    }

    /**
     * Method to handle pagination data
     * @param {boolean} isFilter = false
     */
    private _setPagintionData(isFilter: boolean = false): void {
        if (isFilter) {
            this._totalItems = this._filteredData.length;
            this._pagination.currentPage = 0;
        }

        const startIndex = this._pagination.currentPage * this._pagination.alternative;
        let endIndex = startIndex + this._pagination.alternative;

        if (isFilter) {
            if (endIndex > this._filteredData.length) {
                endIndex = this._filteredData.length;
            }
            this._matches = this._filteredData.slice(startIndex, endIndex);
        } else {
            if (endIndex > this._matchesBackup.length) {
                endIndex = this._matchesBackup.length;
            }
            this._matches = this._matchesBackup.slice(startIndex, endIndex);
        }
    }

    /**
     * Hit detect changes
     */
    private _detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }

    /**
     * Method to get a recommended profiles from REST
     */
    private _getRecommendedProfiles(): void {
        this._httpService.getService(URLConfig.recommendedProfiles)
            .subscribe((recommendations) => {
                this._recommendations = recommendations;
                this._detectChanges();
                this._setRecommendedSlider();
            });
    }

    /**
     * Method to bind sorting options
     */
    private _getSortingOptions(): void {
        this._sortingOptions = [
            {
                value: 'joinedOn',
                label: 'Joined On'
            }
        ];
    }

    /**
     * Enable range slider
     */
    private _setRecommendedSlider(): void {
        $('#sliderContainer').slick({
            arrows: true,
            infinite: false,
            slidesToShow: 4,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 599,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 419,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    ngOnDestroy(){
        console.error("in destroy");
        this._applicationService._setMainHeaderStatus(false);
      }
}