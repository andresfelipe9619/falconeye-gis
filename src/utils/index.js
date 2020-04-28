export const formatToUnits = (number) => {
 var totalStr = '';
 var numStr = String(number);
 var parts = numStr.split( '.' );
 var numLen = parts[0].length;
 for ( var i = 0; i < numLen; i++ ) {
   var y = numLen - i;
   if ( i > 0 && y % 3 == 0 ) {
       totalStr += y >= 6 ? '\'' : ',';
   }
   totalStr += parts[0].charAt(i);
 }
 // Return total formatted string with float part of number (or '.00' when haven't float part)
 return totalStr + '.' + ( parts[1] ? parts[1] : '00');
};
