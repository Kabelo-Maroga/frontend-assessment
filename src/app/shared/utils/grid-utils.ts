import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * This is a utility class for handling common grid operations
 */
export class GridUtils {
  /**
   * Subscribes a MatTableDataSource to an observable data source
   *
   * @param dataSource The MatTableDataSource to update with data
   * @param dataObservable$ The observable providing the data
   * @param unsubscribe$ The Subject to use for cleanup when the component is destroyed
   */
  static subscribeToDataSource<T>(
    dataSource: MatTableDataSource<T>,
    dataObservable$: Observable<T[]> | undefined,
    unsubscribe$: Subject<void>
  ): void {
    if (!dataObservable$) return;

    dataObservable$.pipe(
      takeUntil(unsubscribe$)
    ).subscribe(data => {
      dataSource.data = data || [];
    });
  }

  /**
   * This function set up sorting for a MatTableDataSource
   *
   * @param dataSource The MatTableDataSource to configure
   * @param sort The MatSort directive to apply to the dataSource
   * @param initialSortActive Optional name of column for initial sort
   * @param initialSortDirection Optional initial sort direction ('asc' or 'desc')
   */
  static setupSort<T>(
    dataSource: MatTableDataSource<T>,
    sort: MatSort | undefined,
    initialSortActive?: string,
    initialSortDirection?: 'asc' | 'desc'
  ): void {
    if (!sort) return;

    dataSource.sort = sort;

    if (initialSortActive && initialSortDirection) {
      sort.active = initialSortActive;
      sort.direction = initialSortDirection;
    }
  }
}
