import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { IAdvertisement } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AdverService {
  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}`;
  }

  public getData(): Observable<any[]> {
    return this.http.get<any[]>('assets/products-small.json');
  }

  public getCategories(): any[] {
    return [
      {
        icon: 'pi pi-inbox',
        label: 'All Ads',
        value: 'همه ی آگهی ها'
      },
      {
        icon: 'pi pi-inbox',
        label: 'estate',
        value: 'املاك',
        items: [
          {
            icon: 'pi pi-inbox',
            label: 'Residential for sale',
            value: 'فروشی_مسکونی'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Residential rental',
            value: 'اجاره_مسکونی'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Commercial for sale',
            value: 'فروش_تجاری'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Commercial rental',
            value: 'اجاره_تجاری'
          }
        ]
      },
      {
        icon: 'pi pi-inbox',
        label: 'Vehicles ( buy )',
        value: 'وسایل نقلیه ',
        items: [
          {
            icon: 'pi pi-inbox',
            label: 'Car',
            value: 'خودرو'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Spare parts for cars',
            value: 'لوازم_یدكی_خودرو'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Motorcycle and parts',
            value: 'موتور_سیکلت_و_لوازم_یدکی '
          }
        ]
      },
      {
        icon: 'pi pi-inbox',
        label: 'Electronics',
        value: 'لوازم الكترونیكی ',
        items: [
          {
            icon: 'pi pi-inbox',
            label: 'Laptop and PC',
            value: 'لپتاپ_و_كامپیوتر '
          },
          {
            icon: 'pi pi-inbox',
            label: 'Camera and Accessories',
            value: 'دوربین_فیلم_برداری_و_عكاسی_و_ملزومات'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Audio and Visual',
            value: 'صوتی_و_تصویری '
          },
          {
            icon: 'pi pi-inbox',
            label: 'Game consoles',
            value: 'كنسول_بازی_و_ملزومات '
          },
          {
            icon: 'pi pi-inbox',
            label: 'Mobile-Tablet and Accessories',
            value: 'موبایل_و_تبلت_و_ملزومات '
          },
          {
            icon: 'pi pi-inbox',
            label: 'Other electronic devices',
            value: 'سایر_لوازم_الكترونیكی '
          },
        ]
      },
      {
        icon: 'pi pi-inbox',
        label: 'Home And Garden',
        value: 'مربوط به  خانه',
        items: [
          {
            icon: 'pi pi-inbox',
            label: 'Home furniture, fixtures and decorations',
            value: 'مبلمان_،_وسایل_و_تزئینات_خانه'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Kitchen Accessories',
            value: 'لوازم_آشپزخونه'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Decoration and lighting',
            value: 'دكوری_و_روشنایی'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Carpets and rugs',
            value: 'فرش_و_گلیم_و_قالیچه'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Garden and yard',
            value: 'باغچه_و_حیاط'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Other Items',
            value: 'سایر_وسایل'
          },
        ]
      },
      {
        icon: 'pi pi-inbox',
        label: 'Job',
        value: 'كاریابی',
        items: [
          {
            icon: 'pi pi-inbox',
            label: 'Chef and confectioner',
            value: 'آشپز_و_شیرینی_پز '
          },
          {
            icon: 'pi pi-inbox',
            label: 'Cleaning',
            value: 'نظافت'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Civil, building and architecture',
            value: 'عمران_،_ساختمانی_و_معماری '
          },
          {
            icon: 'pi pi-inbox',
            label: 'Services, restaurants and shops',
            value: 'خدمات،_رستوران_و_فروشگاه '
          },
          {
            icon: 'pi pi-inbox',
            label: 'Accounting, Finance, Legal',
            value: 'حسابداری_،_مالی_،_حقوقی '
          },
          {
            icon: 'pi pi-inbox',
            label: 'Education',
            value: 'آموزش'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Media & Marketing & Graphic Designer',
            value: 'رسانه_و_ماركتینگ_و_گرافیست '
          },
          {
            icon: 'pi pi-inbox',
            label: 'Marketing and Sales',
            value: 'بازاریابی_و_فروش'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Therapeutic, Beauty and Health',
            value: 'درمانی_،_زیبایی_و_بهداشتی '
          },
          {
            icon: 'pi pi-inbox',
            label: 'IT and Computers',
            value: 'رایانه_و_IT'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Transportation',
            value: 'حمل_و_نقل '
          },
          {
            icon: 'pi pi-inbox',
            label: 'Industry and Engineering',
            value: 'صنعت_و_مهندسی '
          }
        ]
      },
      {
        icon: 'pi pi-inbox',
        label: 'Services',
        value: 'خدمات',
        items: [
          {
            icon: 'pi pi-inbox',
            label: 'Immigration',
            value: 'مهاجرتی'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Currency Exchange',
            value: 'صرافی'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Makeup',
            value: 'آرایشگری'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Web site design & Networks',
            value: 'طراحی_سایت_و_شبكه '
          },
          {
            icon: 'pi pi-inbox',
            label: 'Translation',
            value: 'ترجمه'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Repairs',
            value: 'تعمیرات'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Car rental',
            value: 'اجاره_خودرو'
          },
          {
            icon: 'pi pi-inbox',
            label: 'Other services',
            value: 'سایر_خدمات'
          },
        ]
      }
    ];
  }

  public getCities(): any[] {
    return [
      {
        icon: 'pi pi-inbox',
        label: 'Ankara',
        value: 'آنكارا'
      },
      {
        icon: 'pi pi-inbox',
        label: 'Istanbul',
        value: 'استانبول'
      },
      {
        icon: 'pi pi-inbox',
        label: 'Antalya',
        value: 'آنتالیا'
      },
      {
        icon: 'pi pi-inbox',
        label: 'Izmir',
        value: 'ازمیر'
      },
      {
        icon: 'pi pi-inbox',
        label: 'Toronto (soon)',
        value: '0'
      },
      {
        icon: 'pi pi-inbox',
        label: 'Dubai (soon)',
        value: '0'
      },
      {
        icon: 'pi pi-inbox',
        label: 'London (soon)',
        value: '0'
      },
      {
        icon: 'pi pi-inbox',
        label: 'Vancouver (soon)',
        value: '0'
      },
      {
        icon: 'pi pi-inbox',
        label: 'Sydney (soon)',
        value: '0'
      },
      {
        icon: 'pi pi-inbox',
        label: 'Melbourne (soon)',
        value: '0'
      },
      {
        icon: 'pi pi-inbox',
        label: 'Tbilisi (soon)',
        value: '0'
      }
    ];
  }

  public getAdvers(city: string, category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}advertises?_sort=created_at:desc${(category !== 'همه ی آگهی ها' ? `&class=${category}` : '')}&city=${city}`);
  }

  public getSpecialAdvers(city: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}advertises?showcase=true&city=${city}`);
  }

  public getAdver(id: number): Observable<IAdvertisement> {
    return this.http.get<IAdvertisement>(`${this.url}advertises/${id}`);
  }

}
