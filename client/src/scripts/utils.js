import moment from 'moment-timezone';



export function getMethod(obj, methodName){
  //Get method from object using its key
  var res = [];
  for(var m in obj) {
      if(typeof obj[m] == 'function') {
        if(m == methodName){
          res.push(m)
        }
      }
  }
  return res;
}


export function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}


export function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}


export function arraysEqual(a, b) {
  //Test equality of two arrays
  //ref: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript?noredirect=1&lq=1
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


// ProcessData
export function addDays(date, days){
  //Add n(int) days to a Date and return new Date
  let resultDate = new Date( JSON.parse(JSON.stringify(date)) )
  resultDate.setDate(date.getDate() + days)
  return resultDate
}


export function workingDaysBetweenDates(useMoment=true, start, end) {
  //Calculate business days between two dates, or today, if `end` not provided.
  // start < end: start occurs before end
  //TODO: use `moment.js`
  //ref: https://stackoverflow.com/questions/28425132/how-to-calculate-number-of-working-days-between-two-dates-in-javascript-using
  if(useMoment){
    const startM = moment(new Date(start))
    const endM = end ? moment(end) : moment()
    var first = startM.clone().endOf('week');
    var last = endM.clone().startOf('week');
    var days = last.diff(first,'days') * 5 / 7;
    var wfirst = first.day() - startM.day();
    if(startM.day() == 0) --wfirst;
    var wlast = endM.day() - last.day(); 
    if(endM.day() == 6) --wlast; 
    return wfirst + Math.floor(days) + wlast;
  }else{
   let diff = 0
   if(Object.prototype.toString.call(start)!='[object Date]'){
    start = new Date(start)
    }
    if(end){
      if(Object.prototype.toString.call(end)!='[object Date]'){
        end = new Date(end)
      }
      diff = end - start
    } else {
      const today = new Date()
      diff = today - start
    }
    const diffTime = Math.abs(diff);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //console.log(diffTime + " milliseconds");
    //console.log(diffDays + " days");
   return diffDays
  }
}


export function totalTimeBetweenDates(units='days', start, end) {
  //Calculate total time (not business days) between two dates, or today, if `end` not provided.
  // start < end: start occurs before end
  //TODO: use `moment.js`
  //ref: https://stackoverflow.com/questions/28425132/how-to-calculate-number-of-working-days-between-two-dates-in-javascript-using
   let diff = 0.0
   if(Object.prototype.toString.call(start)!='[object Date]'){
    start = new Date(start)
    }
    if(end){
      if(Object.prototype.toString.call(end)!='[object Date]'){
        end = new Date(end)
      }
      diff = end - start
    } else {
      const today = new Date()
      diff = today - start
    }
    const diffTime = diff;
    //const diffTime = Math.abs(diff);
    //console.log(diffTime + " milliseconds");
    let result = 0
    switch(units){
      case 'hours':
        const diffHours = diffTime / (1000 * 60 * 60);
        result = diffHours;
        //console.log(diffDays + " hours");
      case 'days':
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        result = diffDays;
        //console.log(diffDays + " days");
    }
    const rnd = Math.round((result + Number.EPSILON) * 100) / 100;
   return rnd
}


Date.prototype.addDays = function(days){
  //ref: https://stackoverflow.com/questions/563406/how-to-add-days-to-date
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date
}


export function randomIntFromInverval(min, max, faker){
  //Get random integer between two integers
  //provide faker if a seed is needed for pseudo-random number generator
  let result = null
  if(!faker){
    result = Math.floor(Math.random() * (max - min + 1) + min)
  }else{
    const tmp = faker.number.int({ min: 0 , max: 1}) * (max - min)
    result = Math.floor(tmp + min)
  }
  return result
}


export function groupBy(list, keyGetter) {
  /**
   * @description
   * Takes an Array<V>, and a grouping function,
   * and returns a Map of the array grouped by the grouping function.
   *
   * @param list An array of type V.
   * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
   *                  K is generally intended to be a property key of V.
   *
   * @returns Map of the array grouped by the grouping function.
   */
  //export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
  //    const map = new Map<K, Array<V>>();
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}



export function getUniqueArrValues(arr){
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }
  return arr.filter(onlyUnique);
}


export function getRightSetDifferenceOfArrays(arr1, arr2){
  /*Get items in arr1 that are not in arr2
  */
  let difference = arr1.filter(x => !arr2.includes(x))
  return difference
}

export function getSetDifferenceOfArrays(arr1, arr2){
  /*Get symmetric difference between two arrays
  */
  let difference = arr1.filter(x => !arr2.includes(x)).concat(arr2.filter(x => !arr1.includes(x)))
  return difference
}

  
export function getFormattedMilliseconds(milliseconds){
  let formatted = ''
  if (milliseconds >= 60000){
    const intermediate = milliseconds / 60000 
    formatted = `${intermediate.toFixed(2)} min`
  } else if (milliseconds < 60000 && milliseconds >= 1000){
    const intermediate = milliseconds / 1000 
    formatted = `${intermediate.toFixed(2)} sec`
  } else {
    formatted = `${milliseconds.toFixed(2)} milliseconds`
  }
  return formatted
}

/* FAIL: this is too complicated, but may be something to consider in future
export function getFileReferenceNumber(filename, searchTermOrIndexArray=/(^\d+)(.+$)/i, regex=true){
  /* Get a file reference number from file name
  This unique identifier is used throughout the app.  If no ref number is used, then a hash
  of the file name will be applied for uniqueness.
  ref: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript

  The `searchTermOrIndexArray` argument should be one of the following:
   * Array [start, stop] - index numbers to slice
   * String (chars) - simple search term to slice(0, first_index)
   * String (regex) - regex pattern to hit
    
   ('54931863796627370000-econ_2301.00410.pdf').replace(regex, '$1')
   '54931863796627370000'
  *//*
 let reference = ''
 if (Array.isArray(searchTermOrIndexArray)==true && searchTermOrIndexArray.length==2){
  let idx1,idx2
  [idx1, idx2] = searchTermOrIndexArray
  let tmp = filename.slice(idx1, idx2)
  if (Number.isInteger(tmp)){
    reference = tmp
  } else {
    reference = filename.hashCode()
  }
 } else if (typeof(searchTermOrIndexArray)=="string"){
      if (!regex){
        const idx = filename.indexOf(searchTermOrIndexArray)
        reference = filename.slice(0, idx)
      } else if (regex){
        let tmp = (filename).replace(searchTermOrIndexArray, '$1')
        if (tmp.length <= 20 ){
          console.log(tmp)
          reference = tmp
        }
      }
 } else {
  const reference = filename.hashCode()
}
return reference
}*/


export function getFileReferenceNumber(filename){
  /* Get a file reference number from file name
  This unique identifier is used throughout the app.  If no ref number is used, then a hash
  of the file name will be applied for uniqueness.
  
   ('54931863796627370000-econ_2301.00410.pdf').replace(regex, '$1')
   '54931863796627370000'
  */
 let reference = ''
 const regex = /(^\d+)(.+$)/i
 const rslt = (filename).replace(regex, '$1')
 if (rslt.length <= 20 && (Number.parseInt(rslt)).toString().length == rslt.length){
  reference = rslt
 } else {
  reference = filename.hashCode()
 }
 return reference
}


String.prototype.hashCode = function(seed = 0) {
  // Generate hash from string
  //ref: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for(let i = 0, ch; i < this.length; i++) {
      ch = this.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};


export const getDateFromJsNumber = num => {
  // Integer to string date
  let result = ''
  if (typeof(num)=='number'){
      if (String(num).length > 10) {
          let dt = new Date(num)
          result = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}`;
      }
  } else if (typeof(num)=='string' && num.length > 10) {
      const int = parseInt(num) 
      let dt = new Date(int)
      result = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}`;
  } 
  return result;
};


export function getFormattedFileSize(numberOfBytes, format='both') {
  /* Approximate to the closest prefixed unit
  
  format = <decimal, unit, both>
  getFormattedFileSize(139070, 'decimal')  >>> "135.81"
  getFormattedFileSize(139070, 'unit')  >>> "135.81 KiB"
  getFormattedFileSize(139070, 'both')  >>> "135.81 KiB (139070 bytes)"
  */
  const units = [
      "B",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
  ];
  const exponent = Math.min(
      Math.floor(Math.log(numberOfBytes) / Math.log(1024)),
      units.length - 1
  );
  const approx = numberOfBytes / 1024 ** exponent;
  let output = ''
  if(format == 'both'){
    output = exponent === 0 ?
          `${numberOfBytes} bytes` :
          `${approx.toFixed(2)} ${
                units[exponent]
              } (${numberOfBytes} bytes)`
  }else if (format == 'unit'){
    output =
          exponent === 0 ?
          `${numberOfBytes} bytes` :
          `${approx.toFixed(2)} ${
                units[exponent]}`
  }else if (format == 'decimal'){
    output =
    exponent === 0 ?
    `${numberOfBytes} bytes` :
    `${approx.toFixed(2)}`
  }
  return output
}


export function camelize(str) {
  //Turn any string into camelCase
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}  


export function isEmpty(obj) {
  //Check if all an object's attributes are empty
  //ref: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}


export function createEmailString(emailTo, subject, body, ccEmail){
  //Create an email using the user's local client
  //ex: window.open('mailto:test@example.com?subject=subject&body=body');
  const Mailto = `mailto:${emailTo}?`;
  const Cc = ccEmail ? `cc=${ccEmail}` : ``;
  const Subject = `subject=${subject}&`;
  const Body = `body=${body}`;
  
  const msgInfo = Mailto + Cc + Subject + Body
  return msgInfo
}

export function createEmailInLocalClient(msgInfo){
  window.open(msgInfo)
}