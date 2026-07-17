import './style.css'
import './theme.css'
import 'remixicon/fonts/remixicon.css'



interface FilterType  {
  value:number;
  min:number;
  max:number;
  unit:string;
}



interface Filter<T>{
  brightness:T,
  contrast:T,
  exposure:T,
  saturation:T,
  hueRotation:T,
  blur:T,
  grayscale:T,
  sepia:T,
  opacity:T,
  invert:T

}




const filters:Filter<FilterType> = {
  brightness:{
    value:100,
    min:0,
    max:200,
    unit:"%"
  },
  contrast:{
    value:100,
    min:0,
    max:200,
    unit:"%"
  },
  exposure:{
     value:100,
     min:0,
     max:200,
     unit:"%",

  },
  saturation:{
     value:100,
     min:0,
     max:200,
     unit:"%"
  },
  hueRotation:{
    value:0,
    min:0,
    max:360,
    unit:"deg",
  },
  blur:{
    value:0,
    min:0,
    max:20,
    unit:"px"
  },
  grayscale:{
    value:0,
    min:0,
    max:100,
    unit:"%"
  },
  sepia:{
    value:0,
    min:0,
    max:100,
    unit:"%"
  },
  opacity:{
    value:100,
    min:0,
    max:100,
    unit:"%",
  },
  invert:{
     value:0,
     min:0,
     max:100,
     unit:"%"
  }
}



function createElement(name,value,min,max,unit="%") {
  
  

}