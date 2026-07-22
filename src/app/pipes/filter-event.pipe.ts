import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/event';

@Pipe({
  name: 'filterEvent',
  standalone: true
})
export class FilterEventPipe implements PipeTransform {
 transform(events: Event[] = [],search = '',category = '',price = '',sort = '',dateFilter = ''
): Event[] {

  if(!events){
    return [];
  }
  let result = [...events];
  
if(search){

 result = result.filter(event =>
 event.title.toLowerCase().includes(search.toLowerCase()) ||
 event.category.toLowerCase().includes(search.toLowerCase())
 );

}
if(category){

result = result.filter(event =>
event.category.toLowerCase() === category.toLowerCase()
);

}
if(price === 'free'){
result = result.filter(event =>event.ticketTypes[0].price === 0);
}
if(price === 'under50'){
result = result.filter(event =>event.ticketTypes[0].price < 50);
}
if(price === '50plus'){
result = result.filter(event =>event.ticketTypes[0].price >= 50);

}
if(sort === 'date'){
result.sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime());
}
if(sort === 'price'){
result.sort((a,b)=>a.ticketTypes[0].price -b.ticketTypes[0].price);
}
if(dateFilter){
  const today = new Date();
  if(dateFilter === 'upcoming'){
    result = result.filter(event =>new Date(event.date) >= today);
  }
  if(dateFilter === 'week'){
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    result = result.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today &&
    eventDate <= nextWeek;
    });
  }
  if(dateFilter === 'month'){
   const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);
    result = result.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today &&
             eventDate <= nextMonth;
    });
  }
}
return result;
 }
}
