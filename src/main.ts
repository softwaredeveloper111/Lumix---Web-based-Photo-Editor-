import './style.css'
import './theme.css'
import 'remixicon/fonts/remixicon.css'



interface FilterType  {
  value:string;
  min:string;
  max:string;
  unit:string;
}



interface Filter<T>{
  brightness:T,
  contrast:T,
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
    value:"100",
    min:"0",
    max:"200",
    unit:"%"
  },
  contrast:{
    value:"100",
    min:"0",
    max:"200",
    unit:"%"
  },

  saturation:{
     value:"100",
     min:"0",
     max:"200",
     unit:"%"
  },
  hueRotation:{
    value:"0",
    min:"0",
    max:"360",
    unit:"deg",
  },
  blur:{
    value:"0",
    min:"0",
    max:"20",
    unit:"px"
  },
  grayscale:{
    value:"0",
    min:"0",
    max:"100",
    unit:"%"
  },
  sepia:{
    value:"0",
    min:"0",
    max:"100",
    unit:"%"
  },
  opacity:{
    value:"100",
    min:"0",
    max:"100",
    unit:"%",
  },
  invert:{
     value:"0",
     min:"0",
     max:"100",
     unit:"%"
  }
}



function createElement(name:string,value:string,min:string,max:string):HTMLDivElement {
  
  const div = document.createElement("div") as HTMLInputElement;
  div.classList.add("filter");


  const p = document.createElement("p") as HTMLInputElement;
  p.textContent = name;


  const input = document.createElement("input") as HTMLInputElement;
  input.type = "range";
  input.name=  name;
  input.id= name;
  input.min = min;
  input.max = max;
  input.value = value;


  div.appendChild(p);
  div.appendChild(input);
  return div

}




Object.keys(filters).forEach(filterName=>{
  const key = filterName as keyof typeof filters;
  //  console.log(filterName,filters[key])
  const filtersContainerDiv = document.getElementById("filters") as HTMLDivElement;
  filtersContainerDiv.appendChild(createElement(filterName, filters[key].value, filters[key].min, filters[key].max));
})




