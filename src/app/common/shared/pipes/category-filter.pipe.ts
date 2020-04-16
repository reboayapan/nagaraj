import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

    transform(items: any[], categories: any[]): any[] {
        if (!items) return [];
        if (!categories && !(categories.length > 0)) return items;

        items.filter(t => t.isMatch = false);

        return items.filter(item => {
            return categories.filter((category, i) => {
                if (i > 0) {
                    const filteredItems = items.filter(t => t.isMatch);
                    filteredItems.forEach(t => t.isMatch = false);
                    return filteredItems.filter(filteredItem => {
                        if (category.options) {
                            return category.options.filter(filteredOption => {
                                if (filteredItem.otherDetils && filteredOption.parent &&
                                    filteredItem.otherDetils[filteredOption.parent] &&
                                    filteredItem.otherDetils[filteredOption.parent] === filteredOption.id) {
                                    filteredItem.isMatch = true;
                                }
                            });
                        } else {
                            if (filteredItem.otherDetils && category.parent &&
                                filteredItem.otherDetils[category.parent] &&
                                filteredItem.otherDetils[category.parent] >= category.minValue &&
                                filteredItem.otherDetils[category.parent] <= category.maxValue) {
                                filteredItem.isMatch = true;
                            }
                        }

                    });
                } else {
                    if (category.options) {
                        return category.options.filter(option => {
                            if (item.otherDetils && option.parent &&
                                item.otherDetils[option.parent] &&
                                item.otherDetils[option.parent] === option.id) {
                                item.isMatch = true;
                            }
                        });
                    } else {
                        if (item.otherDetils && category.parent &&
                            item.otherDetils[category.parent] &&
                            item.otherDetils[category.parent] >= category.minValue &&
                            item.otherDetils[category.parent] <= category.maxValue) {
                            item.isMatch = true;
                        }
                    }
                }
            });
        });
    }
}