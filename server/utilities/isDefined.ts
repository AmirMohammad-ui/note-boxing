export default function isDefined(data):{isValid: boolean, errors: string[]} {
  let errors: string[] = []
  for(const key in data) {
    if(!data[key]) {
    errors.push(key)      
    }
  }
  if(errors.length > 0){
    return {
      isValid: false,
      errors
    }
  } else {
    return {
      isValid: true,
      errors: []
    }
  }
}