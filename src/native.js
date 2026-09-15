import {Capacitor,registerPlugin} from '@capacitor/core';
const reports=registerPlugin('GuruReports');
export async function exportReport(contents,name){
 if(Capacitor.isNativePlatform()){await reports.exportCsv({contents,name});return;}
 const url=URL.createObjectURL(new Blob([contents],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download=name+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
export async function printReport(){if(Capacitor.isNativePlatform())await reports.printReport();else window.print();}
